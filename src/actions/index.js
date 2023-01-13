
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
export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const REMOVE_FAVOURITE ="REMOVE_FAVOURITE";

// action creator, which is returning the object.
export function addMovies(movieList) {
   return (
      {
         type:ADD_MOVIE,
         movieList,
      }
   )
}

export function addFavourite(movie) {
   return (
      {
         type:ADD_FAVOURITE,
         movie,
      }
   )
}

export function removeFavourite(movie) {
   return(
      {
         type:REMOVE_FAVOURITE,
         movie,
      }
   )
}