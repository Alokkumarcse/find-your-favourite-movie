import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from 'redux';
import './index.css';
import App from './components/app/App';

//import reducer to use as argument in createStore() 
import movies from './reducers';
//Create store using createStore() we need to pass reducer as argument in createStore()
const store = createStore(movies);
console.log(store);


// console.log(store.getState());
// // Dispatch the action to reducer 
// store.dispatch({
//   type:'ADD_MOVIE',
//   movie:[{name:"superman", release:2013}]
// });
// console.log(store.getState());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);


