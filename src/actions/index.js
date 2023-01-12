// {
//    type:'ADD_MOVIE',
//    movies:[m1,m2,m3],
// }

// {
//    type:'REMOVE_MOVIE',
//    movie:[m1]
// }


// {
//    // we have need to define the type of action
//    type:"ADD_MOVIE",
//    //define the state and their data
//    movie:{name:"alok", age:25}
   
// }
// // action is a plain javascript object in which define the type of action and state data


// //How to write the action ?
// // what is the action how to defined it 
// //In redux action is simple javascript object which is dispatch by dispatcher and tell reducer what to do.
// {
//    type: "REMOVE_MOVIE",
//    movie: {hello: "javascript"},
// }

//action type 
export const ADD_MOVIE = "ADD_MOVIE";

// action creator 
export function addMovies(movie) {
   return ({
      type:ADD_MOVIE,
      movie
   })
}