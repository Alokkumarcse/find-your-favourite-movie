import { Component } from 'react';

// importing styles for App component
import style from './App.module.css';
// importing various components 
import Navbar from '../navbar/Navbar';
import MovieCard from '../movie-card/MovieCard';
import Footer from '../footer/Footer';
// we use some static data as of now bcz not making any api call to get data.
import {data} from '../data/data';

// importing some actions
import { addMoviesAction, showFavouriteTabAction } from '../../actions';

class App extends Component {
  componentDidMount() {
    const {store} = this.props;
    /** make an api call to fetch data but here as of now we don't make any api call.*/ 

    /** use the {data} file to get all stored movie data list and dispatch the action with these data. */
    // store.dispatch({
    //   type:"ADD_MOVIE",
    //   movie: data,
    // })
    

    /**
    * here writing the action object, we make an action function() known as action creator,
    * which is returning object same as above in dispatch() method.
    */
    store.dispatch(addMoviesAction(data)); 

    /** after dispatch the action, immediately if any listener is present than they are going to executed,
    * Listener is nothing but a call back function which is perform some async operations.
    */ 
    store.subscribe(() => {
      //here we use forceUpdate() method to update our ui bcz store is changed but we generally not use it,
      // To update our UI whenever store is changed we add some listener to do this.
      this.forceUpdate();
    });
  }

  /** check movie already present in favourite list or not and return boolean value.
  * help of this boolean value we add movie in favourite list or remove from favourite list
  * 
  */
  isFavourite = (movie) => {
    const {store} = this.props;
    //get movieState from store
    const {movieState} = store.getState();
    // get favouriteList from movieState object
    const {favouriteList} = movieState;
    const index = favouriteList.indexOf(movie);
    if(index !== -1){
      return true;
    }
    return false;
  }

  /** Function for handling tab change click event */
  onChangeTab = (val) => {
    const {store} = this.props;
    // dispatch the show favourite tab action 
    store.dispatch(showFavouriteTabAction(val));
  }
  
  // Render component
  render() { 
    const {store} = this.props;
    // our store state looks like this { movieState:{}, searchState:{} } bcz of combining of many reducer in one rootReducer.
    const {movieState, searchState} = store.getState();

    // { movieList: [], favouriteList: [], showFavouriteTab:boolean } in our movieState's data, so access by moviesState object.
    const {movieList, favouriteList, showFavouriteTab } = movieState; 
    /** { result:{}, showSearchedMovie:boolean} in our searchState'data, so it is access by searchState object. */
    const { result, showSearchedMovie } = searchState;

    //select which list is going to shown
    const displayList = showFavouriteTab ? favouriteList: movieList;
    
    console.log(this.props.store.getState());
    console.log("Re-render");

    return (
      <div className={style.app}>
        {/* Rendering Navbar component here */}
        <Navbar store={store} resultData={result} showSearchedMovie={showSearchedMovie} />

        <main className="">
          {/* Movie and Favourite tabs of app */}
          <div className={style.tabs}>
            <div 
              className={`${style.movie__tab} ${showFavouriteTab?'':style.active__tab}`} 
              onClick={() => this.onChangeTab(false)}
            > Movies</div>
            <div 
              className={`${style.fav__tab} ${showFavouriteTab?style.active__tab:''}`} 
              onClick={() => this.onChangeTab(true)}
            > Favourite</div>
          </div>

          <div className="">
            {/* movieList render here inside MovieCard pass as props */}
            {displayList.map((movie,index) => {
              return (
                <MovieCard 
                  movie={movie} 
                  key={`movie${index}`} 
                  dispatch={store.dispatch}  
                  isFavourite={this.isFavourite(movie)}
                />
              )})
            }
          </div>
          {/* this logic for show message when favourte list is empty and we click on the favourite tab */}
          {
            displayList.length === 0 
            ? <div style={{textAlign:"center", padding:"10px", fontSize:"16px"}}>No movie in Favourite list:)</div>
            : null
          }
        </main>

        {/* Rendering Footer component here */}
        <Footer />
      </div>
    );
  }
}

export default App;
