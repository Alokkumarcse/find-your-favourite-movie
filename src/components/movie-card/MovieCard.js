import React, { Component } from 'react';

/** Importing style form movie card */
import style from './MovieCard.module.css';
/** Importing some action creator  */
import { addMovieIntoFavouriteListAction, removeMovieFromFavouriteListAction } from '../../actions';



export default class MovieCard extends Component {

   /** Method for handling Favourite button click event. */
   addToFavourite = () => {
      const {movie, dispatch} = this.props;
      dispatch(addMovieIntoFavouriteListAction(movie));
   }

   /** Method for handling Unfavouriting the movie favourite list event. */
   removeFromFavourite = () => {
      const {movie, dispatch} = this.props;
      dispatch(removeMovieFromFavouriteListAction(movie));
   }
   
   /** Rendering our component */
   render() {
      const {movie, isFavourite} = this.props; 
      return (
         // movie card
         <div className={style.movie__card}>
            {/* Left part of movie card */}
            <div className={style.left__block}>
               <img 
                  className={style.img}
                  src={movie.Poster} 
                  alt='movie' 
               />
            </div>
            {/* Right part of movie card */}
            <div className={style.right__block}>
               <div className={style.title}>{movie.Title}</div>
               <div className={style.genre}>{movie.Genre}</div>
               <div className={style.plot}>{movie.Plot}</div>
               <div className={style.rating__fav}>
                  <div className={style.rating}>Rating: {movie.imdbRating}</div>
                  {/* Doing some conditional rendering to show which btn should appear on movie card 
                  either Favourite button or Unfavourite button.*/
                  }
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
