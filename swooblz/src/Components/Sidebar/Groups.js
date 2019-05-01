import React from 'react';
import {Store} from '../../Store';

export default function Groups(){
    const {state} = React.useContext(Store);
    
    return(
        <div className="sidebar-section groups">
            <h3 className="sidebar-h3">Groups</h3>
            <input type="text" placeholder="Search Groups" />
        </div>
    )
}