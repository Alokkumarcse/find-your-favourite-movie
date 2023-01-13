import { ADD_MOVIE, ADD_FAVOURITE, REMOVE_FAVOURITE } from "../actions"; // importing action type

// we can scale out state from array list to an object of different list so that we can hold different type of data
const initialMovieState = {
   movieList:[],
   favouriteList:[]
}

// reducer which is return new state 
// we use here switch case to operate on different type of action
export default function movies(state = initialMovieState, action ) {
   switch(action.type){
      case ADD_MOVIE: 
         return (
            {
               ...state,
               movieList: action.movieList
            }
         )
      case ADD_FAVOURITE:
         return (
            {
               ...state,
               favouriteList: [action.movie, ...state.favouriteList]
            }
         )
      case REMOVE_FAVOURITE:
      default: return state;
   }
}

//what is reducer ?
// Reducer is a pure function which is return the new state to store  and store merge the new state with old state.
//what is pure function ?
//pure function is that whenever call with same input always gives same output 
//pure function completely depends on the their arguments
//pure function has no any side effects.