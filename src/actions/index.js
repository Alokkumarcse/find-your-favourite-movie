
/** action is a plain javascript object in which define the type of action and state data which is triggered by UI
*   and dispatcher() method dispatch to the reducer to perform that action. 
*/


/** How to write the action ?
*   what is the action how to defined it ?
*   In redux, action is simple javascript object which is dispatch by dispatcher and tell reducer what to do.
*/

// {
//    type: "REMOVE_MOVIE",
//    movie: {hello: "javascript"},
// }

/** action type, generally describe action type in this way */
export const ADD_MOVIE = "ADD_MOVIE";
export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const REMOVE_FROM_FAVOURITE ="REMOVE_FROM_FAVOURITE";
export const SHOW_FAVOURITE_TAB = "SHOW_FAVOURITE_TAB";
export const HANDLE_MOVIE_SEARCH = "HANDLE_MOVIE_SEARCH";

/** addMovies() action creator, which is returning the object. */
export function addMoviesAction(movieList) {
   return (
      {
         type:ADD_MOVIE,
         movieList,
      }
   )
}

/** addToFavourite() action creator */
export function addToFavouriteAction(movie) {
   return (
      {
         type:ADD_TO_FAVOURITE,
         movie,
      }
   )
}

/** removeFromFavourite() action creator */
export function removeFromFavouriteAction(movie) {
   return(
      {
         type:REMOVE_FROM_FAVOURITE,
         movie,
      }
   )
}

/** showFavouriteTab() action creator, which is returning an action object */ 
export function showFavouriteTabAction(val) {
   return(
      {
         type:SHOW_FAVOURITE_TAB,
         val
      }
   )
}

/** handleMovieSearch() action creator, which is returning an action function which is take dispatch() method as argument */
export function handleMovieSearchAction(inputText) {
   console.log("thunk middleware is invoked");
   const api = `http://www.omdbapi.com/?apikey=7acddf26&i=tt3896198`;
   // we do async operation in action creator with help of thunk. 
   // returning action as a method, function(dispatch) is thunk() method
   return function(dispatch) {
      fetch(api)
      .then(resolve => resolve.json())
      .then(data => {
         console.log(data);
         // dispatch an action to reducer to update the store with fetched data
      })
   }
}