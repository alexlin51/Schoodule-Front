import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// index page seems to be the overall controller
// We feed in App component, this is where we will code everything
ReactDOM.render(<App />, document.querySelector('#root'));