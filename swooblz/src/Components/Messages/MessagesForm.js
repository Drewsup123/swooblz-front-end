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

    const uploadFile = async (file, metadata) => {
        console.log(file, metadata);
        const pathToUpload = state.currentChannel.id;
        Load_Firebase();
        const messagesRef = firebase.database().ref('messages');
        const storageRef = firebase.storage.ref();
        const filePath = `chat/public/${uuidv4()}.jpg`;
        await storageRef.child(filePath).put(file, metadata)
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
                <Button onClick={()=>setUploadMediaOpen(true)} color="teal" content="Upload Media" labelPosition="right" icon="cloud upload" />
                <FileModal open={uploadMediaOpen} onClose={()=>setUploadMediaOpen(false)} uploadFile={uploadFile} />
            </Button.Group>
        </Segment>
    );
}