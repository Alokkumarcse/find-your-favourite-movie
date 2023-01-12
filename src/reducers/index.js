import { ADD_MOVIE } from "../actions"; // importing action type

export default function movie(state = [], action ) {
   if(action.type === ADD_MOVIE){
      return action.movie;
   }
   return state;
}

//what is reducer ?
// Reducer is a pure function which is return the new state to store  and store merge the new state with old state.
//what is pure function ?
//pure function is that whenever call with same input always gives same output 
//pure function completely depends on the their arguments
//pure function has no any side effects.