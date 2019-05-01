import React from 'react';
import {Store} from '../../Store';

export default function Groups(){
    const {state} = React.useContext(Store);
    
    return(
        <div className="groups">
            <h3>Groups</h3>
            <input type="text" placeholder="Search Groups" />
        </div>
    )
}