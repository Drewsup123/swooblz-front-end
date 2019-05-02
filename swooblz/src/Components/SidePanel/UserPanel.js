import React from 'react';
import {Grid, Header, Icon, Dropdown} from 'semantic-ui-react';
import {Store} from '../../Store';
import Load_Firebase from '../../firebaseConfig';
import firebase from "firebase";

export default function UserPanel(){
    const {state, dispatch} = React.useContext(Store);

    const handleSignOut = () => {
        Load_Firebase();
        firebase.auth().signOut().then(()=>{
            alert("signed out")
            return(dispatch({type: "SIGNED_OUT"}))
        })
    }

    const dropdownOptions = 
    [
            {
                key:"user",
                text: <span>Signed In as <strong>{state.username}</strong><img style={{width:"20px"}} src={state.profilePicture}/></span>,
                disabled: true,
            },
            {
                key:"avatar",
                text:<span>Change Avatar</span>,
            },
            {
                key:"signout",
                text:<span onClick={handleSignOut}>Sign Out</span>,
            }
        ]
    return(
        <Grid style={{background: "#4c3c4c"}}>
            <Grid.Column>
                <Grid.Row style={{padding:"1.2em", margin:0}}>
                    <Header inverted floated="left" as="h2">
                        <Icon name="code" />
                        <Header.Content>
                            Swooblz
                        </Header.Content>
                    </Header>
                </Grid.Row>
                <Header style={{padding:"0.25em"}} as="h4" inverted>
                    <Dropdown 
                    trigger={
                    <span><img style={{width:'20px'}} src={state.profilePicture}/>{state.username}</span>
                    } 
                    options={dropdownOptions} />
                </Header>
            </Grid.Column>
        </Grid>
    )
}