import React from 'react';
import {Store} from '../Store';

const Authentication = () => {
    const {state, dispatch} = React.useContext(Store);

    return(
        <div>
            <p>Authentication</p>
        </div>
    )
}

export default Authentication;