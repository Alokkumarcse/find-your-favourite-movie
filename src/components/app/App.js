import { Component } from 'react';


import Navbar from '../navbar/Navbar';
import MovieCard from '../movie-card/MovieCard';
import Footer from '../footer/Footer';
import {data} from '../data/data';
import style from './App.module.css';

import { addMovies, showFavouriteTab } from '../../actions';

class App extends Component {
  componentDidMount() {
    const {store} = this.props;
    // make an api call to fetch data
    // use the data and dispatch the action 
    // store.dispatch({
    //   type:"ADD_MOVIE",
    //   movie: data,
    // })
    // here writing the action object, we make an action function which is returning object same as above in dispatch()
    store.dispatch(addMovies(data)); 

    //after dispatch the action, immediately if any listener is present than they are executed
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  // check movie already present in fav list or not
  isFavourite = (movie) => {
    const {favouriteList} = this.props.store.getState();
    const index = favouriteList.indexOf(movie);
    if(index !== -1){
      return true;
    }
    return false;
  }

  // Handle tab change click
  onChangeTab = (val) => {
    // dispatch the show favourite tab action 
    this.props.store.dispatch(showFavouriteTab(val));
  }
  
  // Render component
  render() {
    const {store} = this.props;
    // { movieList: [], favouriteList: [], showFavouriteTab:boolean} in our state these type of data present
    const {movieList, favouriteList, showFavouriteTab} = store.getState(); 
    //select which list is going to shown
    const displayList = showFavouriteTab ? favouriteList: movieList;
    
    console.log(this.props.store.getState());
    console.log("Re-render");

    return (
      <div className={style.app}>
        <Navbar />
        <main className="">
          <div className={style.tabs}>
            <div className={`${style.movie__tab} ${showFavouriteTab?'':style.active__tab}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`${style.fav__tab} ${showFavouriteTab?style.active__tab:''}`} onClick={() => this.onChangeTab(true)}>Favourite</div>
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
         

        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
