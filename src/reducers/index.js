import { ADD_MOVIE, ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE, SHOW_FAVOURITE_TAB,  } from "../actions"; // importing action type

// we can scale out state from array list to an object of different list so that we can hold different type of data
const initialMovieState = {
   movieList:[],
   favouriteList:[],
   showFavouriteTab:false,
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
      case ADD_TO_FAVOURITE:
         return (
            {
               ...state,
               favouriteList: [action.movie, ...state.favouriteList]
            }
         )
      case REMOVE_FROM_FAVOURITE:
         //Remove movie form favouriteList
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

//what is reducer ?
// Reducer is a pure function which is return the new state to store  and store merge the new state with old state.
//what is pure function ?
//pure function is that whenever call with same input always gives same output 
//pure function completely depends on the their arguments
//pure function has no any side effects.