import React from 'react';
import Store from '../../Store';
import UserInfo from './UserInfo';
import ActionButtons from './ActionButtons';
import Friends from './Friends';
import Groups from './Groups';

export default function Sidebar(){
    return(
        <div className="sidebar">
            <UserInfo />
            <ActionButtons />
            <Friends />
            <Groups />
        </div>
    )
}