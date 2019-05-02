import React from 'react';
import {Store} from '../Store';
import {Grid} from 'semantic-ui-react';
import MetaPanel from '../Components/MetaPanel/MetaPanel';
import Messages from '../Components/Messages/Messages';
import ColorPanel from '../Components/ColorPanel/ColorPanel';
import SidePanel from '../Components/SidePanel/SidePanel';

export default function HomePage(){
    const {state, dispatch} = React.useContext(Store);

    return(
        <Grid columns="equal" className="homepage" style={{background: '#eee'}}>
        
            <ColorPanel />

            <SidePanel />

            <Grid.Column style={{marginLeft:320}}>
                <Messages />
            </Grid.Column>

            <Grid.Column width={4} >
                <MetaPanel />
            </Grid.Column>
        </Grid>
    );
}