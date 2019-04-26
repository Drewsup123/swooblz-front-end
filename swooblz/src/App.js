import React from 'react';
import './App.css';
import {Store} from './Store';
import Authentication from './Pages/Authentication';

const App = () => {
  const { state, dispatch } = React.useContext(Store);
    if(state.b_loggedIn){
      return (
        <div className="App">
          <header className="App-header">
            <h1>Swooblz</h1>
            <h2>Welcome {state.username}</h2>
          </header>
        </div>
      );
    }else{
      return(<Authentication />)
    }
}


export default App;
