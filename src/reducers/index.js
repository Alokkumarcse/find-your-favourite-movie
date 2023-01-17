/** what is reducer ?
*   Reducer is a pure function which is always return the new state to store and store merge the new state with old state.
*   what is pure function ?
*   pure function is that whenever call with same input always gives same output 
*   pure function completely depends on the their arguments
*   pure function has no any side effects. 
*/

/** importing combineReducers() method from redux library. */
import { combineReducers } from "redux";

/** importing action types from action. */
import { ADD_MOVIE, ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE, SHOW_FAVOURITE_TAB,  } from "../actions"; 

/** we change our state from array list to an object, so that we can scale the store state at any level.
*  reducer always return new state to store and store merge them with older state automatically. 
*  Inside reducer for any action type we perform any logical operation and return new state to store always.
*  we use here switch case to operate on different type of action.
*/

/** moviesReducer is created here along with their initial state/ default state. */
const initialMovieState = {
   movieList:[],
   favouriteList:[],
   showFavouriteTab:false,
}

export function moviesReducer(state = initialMovieState, action ) {
   console.log('Movies Reducer');
   switch(action.type){
      case ADD_MOVIE: 
         return (
            {
               ...state,
               movieList: action.movieList
            }
         )
      case ADD_TO_FAVOURITE:
         return (
            {
               ...state,
               favouriteList: [action.movie, ...state.favouriteList]
            }
         )
      case REMOVE_FROM_FAVOURITE:
         //Remove movie form favouriteList using array filter method to remove.
         const filterFavList = state.favouriteList.filter(movie => movie.Title !== action.movie.Title);
         return(
            {
               ...state,
               favouriteList: filterFavList,
            }
         )
      case SHOW_FAVOURITE_TAB: 
         return(
            {
               ...state,
               showFavouriteTab: action.val,
            }
         )
      default: return state;
   }
}



/** create initial state of searchReducer and searchReducer(state, action) method,
*   reducer take 2 arguments state and action.
*/
const initialSearchState = {
   result:{}
}

export function searchReducer(state= initialSearchState, action){
   console.log("Search Reducer")
   return state;
}

/** Now I am going to learn how to combine the reducer and make a root reducer,
*  which is containing all child reducers and use them via rootReducer.
*  create initial state of rootReducer and rootReducer(state, action) method
*/
const initialRootState = {
   movieState: initialMovieState,
   searchState: initialSearchState,
}

export default function rootReducer(state= initialRootState, action){
   return {
      // movies data manage by moviesReducer
      movieState: moviesReducer(state.movieState, action),
      // search data manage by searchReducer
      searchState: searchReducer(state.searchState, action),
   }
}

/** we not need to create rootReducer by self, it is created by redux for us which is combineReducers() method. */
// export default combineReducers({
//    movieState: moviesReducer,
//    searchState: searchReducer,
// })