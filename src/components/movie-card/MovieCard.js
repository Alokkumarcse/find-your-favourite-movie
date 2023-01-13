import React, { Component } from 'react';

import style from './MovieCard.module.css';
import { addFavourite, removeFavourite } from '../../actions';



export default class MovieCard extends Component {

   // Favourite btn click handler
   addToFavourite = () => {
      const {movie, dispatch} = this.props;
      dispatch(addFavourite(movie));
   }

   // Remove from favourite list handler 
   removeFromFavourite = () => {
      const {movie, dispatch} = this.props;
      dispatch(removeFavourite(movie));
   }
   
   render() {
      const {movie, isFavourite} = this.props; 
      return (
      
         <div className={style.movie__card}>
            <div className={style.left__block}>
               <img 
                  className={style.img}
                  src={movie.Poster} 
                  alt='movie' 
               />
            </div>
            <div className={style.right__block}>
               <div className={style.title}>{movie.Title}</div>
               <div className={style.genre}>{movie.Genre}</div>
               <div className={style.plot}>{movie.Plot}</div>
               <div className={style.rating__fav}>
                  <div className={style.rating}>Rating: {movie.imdbRating}</div>
                  {
                     isFavourite
                     ? <div className={style.unfav__btn} onClick={this.removeFromFavourite} >Unfavourite</div>
                     : <div className={style.fav__btn} onClick={this.addToFavourite} >Favourite</div>
                  }
                 
               </div>
            </div>
         </div>
      )
   }
}
