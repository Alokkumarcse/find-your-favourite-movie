import React, { Component } from 'react';
import style from './Navbar.module.css';


// Importing handleMovieSearch() action creator from action
import { handleMovieSearch } from '../../actions';


export default class Navbar extends Component {
  // create a state which is hold input text
  constructor() {
    super();
    this.state = {
      inputText:'',
      showSearchedMovie: true,
    }
  }


  // input given in search box
  inputTextForSearch = (event) => { 
    this.setState({
      inputText: event.target.value
    })
  }

  // Handle the search button click, Fetch data from api and show a movie card
  handleSearch = () => {
    const {inputText} = this.state;
    const {dispatch} = this.props.store;
    // dispatch handleMovieSearch() action to fetch data form api, store fetched into search result{}
    dispatch(handleMovieSearch(inputText))
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
              className='' 
              onClick={this.handleSearch}
            > search</button>
         </div>
      </nav>
    )
  }
}
