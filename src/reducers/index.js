export default function movie(state = [], action ) {
   if(action.type === 'ADD_MOVIE'){
      return action.movie;
   }
   return state;
}

