
// action is a plain javascript object in which define the type of action and state data


//How to write the action ?
// what is the action how to defined it 
//In redux action is simple javascript object which is dispatch by dispatcher and tell reducer what to do.

// {
//    type: "REMOVE_MOVIE",
//    movie: {hello: "javascript"},
// }

//action type, generally describe action type in this way
export const ADD_MOVIE = "ADD_MOVIE";
export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const REMOVE_FROM_FAVOURITE ="REMOVE_FROM_FAVOURITE";
export const SHOW_FAVOURITE_TAB = "SHOW_FAVOURITE_TAB";

// action creator, which is returning the object.
export function addMovies(movieList) {
   return (
      {
         type:ADD_MOVIE,
         movieList,
      }
   )
}

export function addToFavourite(movie) {
   return (
      {
         type:ADD_TO_FAVOURITE,
         movie,
      }
   )
}

export function removeFromFavourite(movie) {
   return(
      {
         type:REMOVE_FROM_FAVOURITE,
         movie,
      }
   )
}

export function showFavouriteTab(val){
   return(
      {
         type:SHOW_FAVOURITE_TAB,
         val
      }
   )
}