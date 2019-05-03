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
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
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

    const search = e => {
        if(!e.target.value){
            setSearchTerm('')
        }
        setSearchTerm(e.target.value);
        const messagesCopy = [...messages];
        const regex = new RegExp(searchTerm, 'gi');
        const searchResults = messagesCopy.reduce((acc, message) => {
            if(message.content && message.content.match(regex) || message.user.username && message.user.username.match(regex)){
                acc.push(message)
            }
            return acc;
        }, [])
        setSearchResults(searchResults);
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
            <MessagesHeader searchTerm={searchTerm} search={search} messages={messages}/>

            <Segment>
                <Comment.Group className="messages">
                    {/* Messages */}
                    {searchTerm 
                        ? 
                        searchResults.map(message => <Message key={message.timestamp} message={message} />)
                        :
                        messages.map(message => <Message key={message.timestamp} message={message}/>)}
                </Comment.Group>
            </Segment>

            <MessageForm />
        </React.Fragment>
    )
}