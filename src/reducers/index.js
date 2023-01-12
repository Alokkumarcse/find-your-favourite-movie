import { ADD_MOVIE } from "../actions"; // importing action type

// we can scale out state from array list to an object of different list so that we can hold different type of data
const initialMovieState = {
   movieList:[],
   favouriteList:[]
}

export default function movie(state = initialMovieState, action ) {
   if(action.type === ADD_MOVIE){
      return (
         {
            // spreading the state using ... (spread) operator
            ...state,
            // rewriting the movieList, bcz new movieList is coming from action 
            movieList: action.movieList
         }
      )
   }
   // if action type don't matched than return old state as it is.
   return state;
}

//what is reducer ?
// Reducer is a pure function which is return the new state to store  and store merge the new state with old state.
//what is pure function ?
//pure function is that whenever call with same input always gives same output 
//pure function completely depends on the their arguments
//pure function has no any side effects.