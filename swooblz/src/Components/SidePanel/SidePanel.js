import React from 'react';
import {Menu} from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Channels from './Channels';
import DirectMessages from './DirectMessages';

export default function SidePanel(){
    return(
        <Menu size="large" inverted fixed="left" vertical style={{backgound: "#4c3c4c", fontSize:"1.2rem"}}>
            <UserPanel />
            <Channels />
            <DirectMessages />
        </Menu>
    )
}