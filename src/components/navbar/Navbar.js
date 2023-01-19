import React, { Component } from 'react';
import style from './Navbar.module.css';


/** Importing handleMovieSearch() action creator from action */
import { handleMovieSearchAction, addMovieIntoMovieListAction } from '../../actions';


export default class Navbar extends Component {
  /** create a state which is hold input text given by user */
  constructor() {
    super();
    this.state = {
      inputText:'',
    }
  }

  /** input typed in search box, collected into inputText to further use */
  inputTextForSearch = (event) => { 
    this.setState({
      inputText: event.target.value
    })
  }

  /** Function for handle the search button click event, It Fetch movie data from OMDB api by help of Redux-Thunk middleware
  *   and show the result in from of single movie card
  */
  handleSearch = () => {
    /** get input text from state and store from props */
    const {inputText} = this.state;
    const {store} = this.props;
    /** dispatch handleMovieSearch() action to fetch data form api, store fetched into search result{} store state. */
    store.dispatch(handleMovieSearchAction(inputText));
  } 

  /** Function for handle the search movie add into favourite list */
  addToMovie = () => {
    const {resultData:movie, store} = this.props;
    if(movie.Response === "False"){
      return;
    }
    const movieList = [movie];
    store.dispatch(addMovieIntoMovieListAction(movieList));
  }

  render() {
    const {resultData: movie, showSearchedMovie } = this.props;
    return (
        <nav className={style.nav}>
          <div >
            <div className={style.search__box}>
              <input 
                type="text" 
                className={style.input}
                placeholder="search here..."
                onChange={this.inputTextForSearch}
              />
              <button 
                className={style.search} 
                onClick={this.handleSearch}
              > search</button>
            </div>
          </div>
          {/* show search result as movie card if any found */}
          <div className='movie__card'>
            {
              showSearchedMovie && 
              <div className={style.movie__card}>
                { 
                  movie.Response === "True"
                  ? <img className={style.img} src={movie.Poster} alt='movie' /> 
                  : null
                }
                {
                  movie.Response === "True"
                  ? <div className={style.right__block}>
                      <div className={style.title}>{movie.Title}</div>
                      <div className={style.fav__btn} onClick={this.addToMovie} > Add to Movie </div>
                    </div>
                  : <div style={{padding:"3px 5px", color:"red", textAlign:"center", fontSize:"14px" }}>404 Movie not found! </div>
                }
              </div> 
            }
          </div> 
        </nav>
       
    )
  }
}
