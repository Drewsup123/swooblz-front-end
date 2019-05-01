import React from 'react';
import {Store} from '../../Store';

export default function Chat(){
    const {state} = React.useContext(Store);

    return(
        <div className="chat">
            <h1 style={{textAlign:"center", fontSize:"3rem"}}>Swooblz</h1>
        </div>
    )
}