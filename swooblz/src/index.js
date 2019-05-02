import React from 'react';
import "semantic-ui-css/semantic.min.css";
import ReactDOM from 'react-dom';
import App from './App';
import StoreProvider from './Store';
require('dotenv').config();

ReactDOM.render(<StoreProvider><App /></StoreProvider>, document.getElementById('root'));
