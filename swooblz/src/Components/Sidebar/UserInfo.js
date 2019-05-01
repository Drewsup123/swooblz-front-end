import React from 'react';
import {Store} from '../../Store';

export default function UserInfo(props){
    const {state, dispatch} = React.useContext(Store);
    return(
        <div className="user-info">
            <img src={state.profilePicture} alt="Profile" />
            <h2>{state.username}</h2>
            <button>Edit Account Settings</button>
            <hr />
        </div>
    )
}