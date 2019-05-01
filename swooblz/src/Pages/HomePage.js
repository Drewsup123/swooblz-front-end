import React from 'react';
import {Store} from '../Store';
import SideBar from '../Components/Sidebar/Sidebar'

export default function HomePage(){
    const {state, dispatch} = React.useContext(Store);

    return(
        <div className="App">
            <SideBar />
        </div>
    );
}