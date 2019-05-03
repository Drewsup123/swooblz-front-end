import React from 'react';
import {Header, Segment, Input, Icon} from 'semantic-ui-react';
import {Store} from '../../Store';

export default function MessagesHeader(props){
    const {state} = React.useContext(Store);

    const countUsers = () => {
        const uniqueUsers = props.messages.reduce((acc, message) => {
            if(!acc.includes(message.user.name)){
                acc.push(message.user.name);
            }
            return acc;
        }, []);
        const numOfUniqueUsers = uniqueUsers.length;
        return numOfUniqueUsers;
    }

    return(
        <Segment clearing style={{marginTop:"20px"}}>
            <Header fluid="true" as="h2" floated="left" style={{marginBottom:0}} >
                <span>
                    {state.currentChannel ? state.currentChannel.name : <h2>No Channel Selected</h2>}
                    <Icon name="star outline" color="black" />
                </span>
                <Header.Subheader>{countUsers()} {countUsers() <= 1 ? "User" : "Users"}</Header.Subheader>
            </Header>

            <Header floated="right">
                <Input onChange={props.search} size="mini" icon="search" name="searchTerm" placeholder="Search Messages" />
            </Header>
        </Segment>
    );
}