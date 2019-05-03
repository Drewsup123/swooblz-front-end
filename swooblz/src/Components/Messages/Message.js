import React from 'react';
import {Comment} from 'semantic-ui-react';
import moment from 'moment';

export default function Message(props){

    const isOwnMessage = (message, user) => {
        return message.user.id === user.id ? 'message_self' : '';
    }

    const timeFromNow = (timestamp) => {
        return moment(timestamp).fromNow();
    }
    return(
        <Comment>
            <Comment.Avatar src={props.message.user.avatar} />

            <Comment.Content className={isOwnMessage}>
                <Comment.Author as='a'>{props.message.user.username}</Comment.Author>
                <Comment.Metadata>
                    {timeFromNow(props.message.timestamp)}
                </Comment.Metadata>
                <Comment.Text>{props.message.content}</Comment.Text>
            </Comment.Content>
        </Comment>
    );
}