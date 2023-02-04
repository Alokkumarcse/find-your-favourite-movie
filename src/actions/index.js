
/** action is a plain javascript object in which define the type of action and state data which is triggered by UI
*   and dispatcher() method dispatch to the reducer to perform that action. 
*/

/**
 *  How to write the action ?
 *   what is the action how to defined it ?
 *   In redux, action is simple javascript object which is dispatch by dispatcher and tell reducer what to do.
 */
// {
//    type: "REMOVE_MOVIE",
//    movie: {hello: "javascript"},
// }

/** action type, generally describe action type in this way */
export const ADD_MOVIE_INTO_MOVIE_LIST = "ADD_MOVIE_INTO_MOVIE_LIST";
export const ADD_MOVIE_INTO_FAVOURITE_LIST = "ADD_MOVIE_INTO_FAVOURITE_LIST";
export const REMOVE_MOVIE_FROM_FAVOURITE_LIST ="REMOVE_FROM_FAVOURITE_LIST";
export const SHOW_FAVOURITE_TAB = "SHOW_FAVOURITE_TAB";
export const HANDLE_MOVIE_SEARCH = "HANDLE_MOVIE_SEARCH";
export const ADD_SEARCHED_RESULT_INTO_RESULT_LIST = "ADD_SEARCHED_RESULT_INTO_RESULT_LIST";

/** addMovies() action creator, which is returning the object. */
export function addMovieIntoMovieListAction(movieList) {
   return (
      {
         type:ADD_MOVIE_INTO_MOVIE_LIST,
         movieList,
      }
   )
}

/** addToFavourite() action creator */
export function addMovieIntoFavouriteListAction(movie) {
   return (
      {
         type:ADD_MOVIE_INTO_FAVOURITE_LIST,
         movie,
      }
   )
}

/** removeFromFavourite() action creator */
export function removeMovieFromFavouriteListAction(movie) {
   return(
      {
         type:REMOVE_MOVIE_FROM_FAVOURITE_LIST,
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
   console.log("Thunk middleware is invoked");
   const api = `http://www.omdbapi.com/?apikey=7acddf26&t=${inputText}`;
   /** we do async operation in action creator with help of redux thunk. */
   /** returning action as a method like this function(dispatch){...} is redux thunk. */
   return function(dispatch) {
      fetch(api)
      .then(resolve => resolve.json())
      .then(searchedMovie => {
         console.log(searchedMovie);
         // dispatch an action to reducer, which is update the store's searchState result:{} with searchedMovie data.
         dispatch(addSearchedResultIntoResultListAction(searchedMovie));
      })
   }
}

/** addSearchResult() action creator. */
export function addSearchedResultIntoResultListAction(resultData) {
   return(
      {
         type: ADD_SEARCHED_RESULT_INTO_RESULT_LIST,
         resultData,
      }
   )
}