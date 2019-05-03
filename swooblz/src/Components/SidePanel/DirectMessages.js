import React from 'react';
import {Store} from '../../Store';
import {Menu, Icon} from 'semantic-ui-react';
import firebase from 'firebase';
import Load_Firebase from '../../firebaseConfig';

export default function DirectMessages(){
    const {state} = React.useContext(Store);
    const [users, setUsers] = React.useState([{username:'test'}]);
    const [reload, setReload] = React.useState(false);

    React.useEffect(() => {
        addListeners(state.id);
    },[])

    const addListeners = currentUserId => {
        Load_Firebase();
        const usersRef = firebase.database().ref('users');
        let loadedUsers = [];
        usersRef.on('child_added', snap => {
                let user = snap.val();
                console.log("SNAP VALUE", snap.val())
                user['uid'] = snap.key;
                user['status'] = 'offline';
                loadedUsers.push(user);
                setUsers(loadedUsers);
                console.log("Loaded users and stuff")
                console.log(loadedUsers, users)
        })
        // To tell if a user is online or not
        const connectedRef = firebase.database().ref('.info/connected');
        const presenceRef = firebase.database().ref('presence')
        connectedRef.on('value', snap => {
            if(snap.val() === true){
                const ref = presenceRef.child(currentUserId)
                ref.set(true)
                ref.onDisconnect().remove(err=>{
                    if(err !== null){
                        console.log(err);
                    }
                })
            }
        })

        presenceRef.on('child_added', snap => {
            addStatusToUser(snap.key)
        })

        
        presenceRef.on('child_removed', snap => {
            addStatusToUser(snap.key, false)
        })
    }

    const addStatusToUser = (userId, connected = true) => {
        const updatedUsers = users.reduce((acc, user) => {
            if(user.id == userId){
                user['status'] = `${connected ? 'online' : 'offline'}`
            }
            return acc.concat(user)
        },[]) 
        setUsers(updatedUsers);
    }

    const isUserOnline = user => {
        return(user.status === 'online');
    }

    return(
        <Menu.Menu className="menu">
            <Menu.Item>
                <span><Icon name="mail" />Direct Messages({users.length})</span>
            </Menu.Item>
            {users.map(user =>(
                <Menu.Item key={user.id} onClick={console.log(user)} style={{opacity: 0.7, fontStyle:'italic'}}>
                    <Icon name="circle" color={isUserOnline(user) ? 'green' : 'red'}/>
                    @ {user.username}
                </Menu.Item>
            ) )}
        </Menu.Menu>
    );
}