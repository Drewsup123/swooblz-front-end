import React from 'react';
import {Segment, Button, Input} from 'semantic-ui-react';
import Load_Firebase from '../../firebaseConfig';
import firebase from 'firebase';
import {Store} from '../../Store';
import FileModal from './FileModal';
import uuidv4 from 'uuid/v4';

export default function MessagesForm(){
    const [message, setMessage] = React.useState("");
    const {state} = React.useContext(Store);
    const [loading, setLoading] = React.useState(false);
    const [uploadMediaOpen, setUploadMediaOpen] = React.useState(false);
    const [uploadState, setUploadState] = React.useState('');
    const [uploadTask, setUploadTask] = React.useState(null);
    const [percentUpload, setPercentUpload] = React.useState(0)

    const onChangeHandler = e => {
        setMessage(e.target.value)
    }

    const sendMessage = () => {
        setLoading(true);
        Load_Firebase();
        const messagesRef = firebase.database().ref('messages');
        if(message){
            messagesRef.child(state.currentChannel.id)
            .push()
            .set(
                {
                    content: message, 
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    user:{
                        id: state.id,
                        username : state.username,
                        avatar: state.profilePicture
                    }
                }
                ).then(()=>{
                    setMessage("");
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })
        }else{
            alert("No message")
        }
    }

    const uploadFile = (file, metadata) => {
        console.log(file, metadata);
        const pathToUpload = state.currentChannel.id;
        Load_Firebase();
        const messagesRef = firebase.database().ref('messages');
        const storageRef = firebase.storage().ref();
        const filePath = `chat/public/${uuidv4()}.jpg`;
        setUploadState('uploading');
        setUploadTask(storageRef.child(filePath).put(file, metadata), () => {
            uploadTask.on('state_changed', snap => {
                const percentUpload = Math.round((snap.bytesTransferred / snap.totalBytes)*100);
                setPercentUpload(percentUpload)
            }, err=>{
                console.log(err)
                setUploadState('ERROR');
                setUploadTask(null)
            },() => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL, ref) => {
                    sendFileMessage(downloadURL, pathToUpload);
                }).catch(err => {
                    console.log(err)
                    setUploadState('ERROR');
                    setUploadTask(null)
                })
            })
        })
    }

    const sendFileMessage = (fileURL, pathToUpload) => {
        console.log("SENDING FILE MESSAGE!!!!")
        const ref = firebase.database().ref('messages');
        ref.child(pathToUpload)
        .push()
        .set(
            {
                image: fileURL, 
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user:{
                    id: state.id,
                    username : state.username,
                    avatar: state.profilePicture
                }
                }
            )
        .then(() => {
            setUploadState('Done');
        })
        .catch(err => {
            console.log(err);
        })
    }   

    return(
        <Segment className="message__form">
            <Input
                fluid 
                name="message" 
                style={{marginBottom: '0.7em'}}
                label={<Button icon={"add"} />}
                value={message}
                labelPosition="left"
                placeholder="Write your message"
                onChange={onChangeHandler}
            />

            <Button.Group icon widths="2">
                <Button disabled={loading} onClick={sendMessage} color="orange" content="Add Reply" labelPosition="left" icon="edit" />
                <Button disabled={true} onClick={()=>setUploadMediaOpen(true)} color="teal" content="Upload Media / Currently in Development" labelPosition="right" icon="cloud upload" />
                <FileModal open={uploadMediaOpen} onClose={()=>setUploadMediaOpen(false)} uploadFile={uploadFile} />
            </Button.Group>
        </Segment>
    );
}