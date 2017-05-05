import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';

import './index.css';

firebase.initializeApp({
    apiKey: "AIzaSyAWcE5SzmUs7LVB8S51ZIx1RPEZx_h1Qyk",
    authDomain: "kiux-base-de-datos.firebaseapp.com",
    databaseURL: "https://kiux-base-de-datos.firebaseio.com",
    projectId: "kiux-base-de-datos",
    storageBucket: "kiux-base-de-datos.appspot.com",
    messagingSenderId: "1009371896406"
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
