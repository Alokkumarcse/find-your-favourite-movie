import React, { Component } from 'react';
import style from './Navbar.module.css';


/** Importing handleMovieSearch() action creator from action */
import { handleMovieSearchAction } from '../../actions';


export default class Navbar extends Component {
  /** create a state which is hold input text given by user */
  constructor() {
    super();
    this.state = {
      inputText:'',
      showSearchedMovie: true,
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

  render() {
    return (
      <nav className={style.nav}>
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
      </nav>
    )
  }
}
