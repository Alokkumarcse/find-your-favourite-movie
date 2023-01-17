import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore, applyMiddleware} from 'redux';

// Stylesheet of index file imported here
import './index.css';
// APP component imported
import App from './components/app/App';

// Import reducer to use as argument in createStore() to create store in Redux
import rootReducer from './reducers';


/** add middleware in app to perform some operation between action triggered and action dispatch.
*   middleware take argument as (object, next, action) , next() take argument as a next middleware,
*   if not any middleware then dispatch the action. 
*/

/** we write here loggerMiddleware function loggerMiddleware(obj, next, action)
*   we executed loggerMiddleware in curried from of function like this loggerMiddleware({property: value})(next)(action) 
*/

// const loggerMiddleware = function({dispatch, getState}){
//   return function(next) {
//     return function(action){
//       console.log("Logger Middleware");
//       console.log("Action type", action.type);
//       // we must be call the next() method to execute next middleware if any otherwise dispatch the action so our data flow work
//       next(action);
//     }
//   }
// }

/** we can write middleware in another way using arrow function formate. */
const loggerMiddleware = ({dispatch, getState}) => (next) => (action) => {
  console.log("Logger Middleware");
  if(typeof action !== 'function'){
    console.log("Action type", action.type);
  }
  next(action);
}

/**  creating thunk, it is middleware which is return an function() by action. */
const thunk = ({dispatch, getState}) => (next) => (action) => {
  // if our condition match than dispatch action
  if(typeof action === 'function'){
    action(dispatch);
    return;
  }
  next(action);
}


/**
* Redux, store has some ability such as create store to hold states, Read the state, Update state,
*  subscribe state so whenever state change ui get notify that some change happen in store state.
* Create store using createStore() we need to pass reducer as argument in createStore()
*   here we can pass any middleware by using applyMiddleware(middleware name) method
*/
const store = createStore(rootReducer, applyMiddleware(loggerMiddleware, thunk) );
// console.log(store);
// console.log(store.getState());

/* Dispatch the action to reducer like this.*/
// store.dispatch({
//   type:'ADD_MOVIE',
//   movie:[{name:"superman", release:2013}]
// });
// console.log(store.getState());

/** make root place in index.html, there we add whole app code to append in html and make a dom
*   ReactDOM help to create virtual dom and help us sync with real dom of app
*   React manipulate virtual dom to make our app efficient and fast render in browser. 
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);


