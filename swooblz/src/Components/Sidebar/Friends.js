import React from 'react';
import {Store} from '../../Store';

export default function Friends(){
    const {state} = React.useContext(Store);
    
    return(
        <div className="friends">
            <h3>Friends</h3>
            <input type="text" placeholder="Search" />
        </div>
    )
}