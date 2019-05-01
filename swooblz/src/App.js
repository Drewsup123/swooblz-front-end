import React from 'react';
import './App.css';
import {Store} from './Store';
import Authentication from './Pages/Authentication';
import HomePage from './Pages/HomePage';

const App = () => {
  const { state, dispatch } = React.useContext(Store);
    if(state.b_loggedIn){
      return (
        <HomePage />
      );
    }else{
      return(<Authentication />)
    }
}


export default App;
