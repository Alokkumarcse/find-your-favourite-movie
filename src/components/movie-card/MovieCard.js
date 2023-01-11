import React, { Component } from 'react';
import style from './MovieCard.module.css';



export default class MovieCard extends Component {
  render() {
   const {movie} = this.props; 
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
               <div className={style.fav__btn}>Favourite</div>
            </div>
         </div>
      </div>
   )
  }
}
