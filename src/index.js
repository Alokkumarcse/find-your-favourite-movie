import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore, applyMiddleware} from 'redux';
import './index.css';
import App from './components/app/App';

//import reducer to use as argument in createStore() 
import rootReducer from './reducers';

//add middleware in app to perform some operation between action triggered  and dispatch the action
// middleware take argument as (object, next, action)
// we write here logger middleware  function loggerMiddleware(obj, next, action)
// we executed loggerMiddleware in curried from function loggerMiddleware({property: value})(next)(action)
const loggerMiddleware = function({dispatch, getState}){
  return function(next) {
    return function(action){
      console.log("Logger Middleware");
      console.log("Action type", action.type);
      // we must be call the next() method to execute next middleware if any otherwise dispatch the action so our data flow work
      next(action);
    }
  }
}

//Create store using createStore() we need to pass reducer as argument in createStore()
// here we can pass any middleware by using applyMiddleware(middleware name) method
const store = createStore(rootReducer, applyMiddleware(loggerMiddleware) );
// console.log(store);

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


