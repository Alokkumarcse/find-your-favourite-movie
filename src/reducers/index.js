export default movie(state = [], action ) {
   if(action.type === 'ADD_MOVIE'){
      return action.movie;
   }
   return state;
}

