import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from 'redux';
import './index.css';
import App from './components/app/App';

//import reducer 
import movie from './reducers';

const store = createStore(movie);
console.log(store);
console.log(store.getState());





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


