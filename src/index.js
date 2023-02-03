import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

/** Stylesheet of index file imported here */
import './index.css';
/** App component imported */
import App from './components/app/App';

/** Import reducer to use as argument in createStore() to create store in Redux */
// import rootReducer from './reducers';
/** importing combined reducer */
import combineReducers from './reducers';


/** add middleware in app to perform some other operations, which is happen after trigger the action 
*   and action reach to the reducer via dispatcher.
*   middleware take argument as (object, next, action) , next() take argument as a next middleware,
*   if not any middleware then dispatch the action to reducer. 
*/

/** we write here loggerMiddleware function loggerMiddleware(obj, next, action)
*   we executed loggerMiddleware in curried from of function like this loggerMiddleware({object})(next)(action) 
*/

// const loggerMiddleware = function({dispatch, getState}){
//   return function(next) {
//     return function(action){
//       console.log("Logger Middleware");
//       console.log("Action type", action.type);
//       /** we must be call the next() method to execute next middleware if any, Otherwise dispatch the action so our data flow work */
//       next(action);
//     }
//   }
// }

/** we can write middleware in another way using arrow function formate. */
const loggerMiddleware = ({dispatch, getState}) => (next) => (action) => {
  console.log("Logger Middleware");
  /** log only those action which is not function type. */
  if(typeof action !== 'function'){
    console.log("Action type", action.type);
  }
  next(action);
}

/**  creating thunk, it is middleware which is get an action function(dispatch) by returning from action creator. */
// const thunk = ({dispatch, getState}) => (next) => (action) => {
//   /** if our action is an function then invoke that action function with dispatch as a argument to reducer. */
//   if(typeof action === 'function'){
//     action(dispatch);
//     return;
//   }
//   /** if action is not function than simply pass the action returning an object to reducer. */
//   next(action);
// }
/** Thunk is handle by redux, so use thunk from library, which is same as the above we write the thunk. */


/**
* Redux, store has some default ability such as create store to hold states, Read the state, Update state,
*  subscribe state so whenever state change ui get notify that some change happen in store state.
* Create store using createStore() we need to pass reducer as argument in createStore()
*   here we can pass any middleware by using applyMiddleware(middleware name) method
*/
// const store = createStore(rootReducer, applyMiddleware(loggerMiddleware, thunk) );
const store = createStore(combineReducers, applyMiddleware(loggerMiddleware, thunk) );
// console.log(store);
// console.log(store.getState());

/** creating the context to save form prop drilling */
export const StoreContext = createContext();
console.log("storeContext", StoreContext );
/** Creating own Provider component and store can be accessed by all the descendants.
 * in context provider we set value={...}
 * whenever any change happen inside  value all child component accessed the context value is re-render.
 * so we not need to pass store as props in descendants.
*/
class Provider extends React.Component {
  render() {
    const {store} = this.props;
    return(
      <StoreContext.Provider value={store}> 
        {this.props.children}
      </StoreContext.Provider>
    )
  }
}

/* Dispatch the action to reducer like this.*/
// store.dispatch({
//   type:'ADD_MOVIE',
//   movie:[{name:"superman", release:2013}]
// });
// console.log(store.getState());

/** 
 * Implementing connect method which is connect to Redux store
 * connect(callback)(component) method return new connected component. 
 * connect(callback) returning another function(), which is taking function(component) as argument,
 * now function(component) returning new component.
 */
function connect(callback){
  return function(component){
    return 

    }
  }

}

/** make root place in index.html, there we add whole app code to append in html and make a dom
*   ReactDOM help to create virtual dom and help us sync with real dom of app
*   React manipulate virtual dom to make our app efficient and fast render in browser. 
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Pass store as props to Provider and Rendering App component inside Provider component */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


