import React from 'react';
import {Segment, Comment} from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessagesForm';
import Load_Firebase from '../../firebaseConfig';
import firebase from 'firebase';
import {Store} from '../../Store';
import Message from './Message';
// const messagesRef = firebase.database().ref('messages');

export default function Messages(){
    const [messages, setMessages] = React.useState([]);
    const [loadingMessages, setLoadingMessages] = React.useState(false);
    const {state, dispatch} = React.useContext(Store);

    const getMessages = () =>{
        let loadedMessages = [];
        Load_Firebase();
        const messagesRef = firebase.database().ref('messages');
        messagesRef.child(state.currentChannel.id).on('child_added', snap => {
            loadedMessages.push(snap.val())
        })
        setMessages(loadedMessages)
    }

    React.useEffect(()=>{
        if(typeof state.currentChannel != 'undefined'){
            if(state.currentChannel.id){
                getMessages()
            }
        }
    })

    return(
        <React.Fragment>
            <MessagesHeader />

            <Segment>
                <Comment.Group className="messages">
                    {/* Messages */}
                    {messages.map(message => <Message key={message.timestamp} message={message}/>)}
                </Comment.Group>
            </Segment>

            <MessageForm />
        </React.Fragment>
    )
}