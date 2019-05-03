import React from 'react';
import {Menu, Icon, Modal, Header, Form, Input, Button} from 'semantic-ui-react';
import {Store} from '../../Store';
import Load_Firebase from '../../firebaseConfig';
import firebase from 'firebase';

export default function Channels(){
    const {state, dispatch} = React.useContext(Store);
    const [open , setOpen] = React.useState(false);
    const [channelSettings, setChannelSettings] = React.useState({channelName:"", channelDetails:""});
    const [channels, setChannels] = React.useState([]);
    const [reload, setReload] = React.useState(false);
    const [activeChannel, setActiveChannel] = React.useState('');

    const handleChange = e => {
        setChannelSettings({...channelSettings, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(channelSettings.channelName && channelSettings.channelDetails){
            Load_Firebase();
            const channelsRef = firebase.database().ref('channels');
            const key = channelsRef.push().key;
            const newChannel = {
                id: key,
                name : channelSettings.channelName,
                details: channelSettings.channelDetails,
                createdBy: {
                    name: state.username,
                    avatar: state.profilePicture,
                }
            }
            channelsRef.child(key).update(newChannel).then(()=>{
                setChannelSettings({channelName:"", channelDetails:""});
                setOpen(false);
                alert('Channel Added')
            }).catch(err => {
                console.log(err);
            })
        }else{
            alert("Fill out all fields");
        }
    }

    const changeChannel = channel => {
        dispatch({type:"CHANGE_CURRENT_CHANNEL", payload:channel})
        setActiveChannel(channel.id)
    }

    React.useEffect(()=>{
        Load_Firebase();
        const channelsRef = firebase.database().ref('channels');
        let loadedChannels = [];
        channelsRef.on('child_added', snap=>{
            loadedChannels.push(snap.val())
        })
        setTimeout(()=>{setChannels(loadedChannels)},1000);
    },[])

    return(
        <React.Fragment>
            <Menu.Menu className="menu">
                <Menu.Item>
                    <span>
                        <Icon name="exchange" />CHANNELS
                    </span>
                    ({channels.length ? channels.length : 0})<Icon name="add" style={{cursor:"pointer"}} onClick={()=>setOpen(true)}/>
                </Menu.Item>
                {channels.length > 0 ? channels.map(channel => {
                    return(
                        <Menu.Item 
                            onClick={()=>changeChannel(channel)} 
                            key={channel.id} 
                            name={channel.name} 
                            style={{opacity:0.7}}
                            active={channel.id === activeChannel}
                        >
                            # {channel.name}
                        </Menu.Item>
                    )
                }) : <p>no channels yet</p>}
            </Menu.Menu>

            <Modal basic open={open} onClose={()=>setOpen(false)}>
                <Modal.Content>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <Input fluid label="Name of channel" name="channelName" onChange={handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <Input fluid label="Channel Details" name="channelDetails" onChange={handleChange} />
                        </Form.Field>
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button onClick={handleSubmit} color="green" inverted><Icon name="checkmark"/>Add</Button>
                    <Button onClick={()=>setOpen(false)} color="red" inverted><Icon name="remove" />Cancel</Button>
                </Modal.Actions>
            </Modal>
        </React.Fragment>
    )
}