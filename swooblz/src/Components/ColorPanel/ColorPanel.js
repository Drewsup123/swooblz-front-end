import React from 'react';
import {Sidebar, Menu, Divider, Button} from 'semantic-ui-react'

export default function ColorPanel(){
    return(
        <Sidebar
            as={Menu}
            icon="labeled"
            inverted
            vertical
            visible
            width="very thin"
        >
        <Divider />
        <Button icon="add" color="blue" size="small" />
        </Sidebar>
    )
}