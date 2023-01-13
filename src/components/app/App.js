import { Component } from 'react';


import Navbar from '../navbar/Navbar';
import MovieCard from '../movie-card/MovieCard';
import Footer from '../footer/Footer';
import {data} from '../data/data';
import style from './App.module.css';

import { addMovies } from '../../actions';

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
  
  render() {
    const {store} = this.props;
    const {movieList} = this.props.store.getState(); // { movieList: [], favouriteList: [] }
    console.log(this.props.store.getState());
    console.log("Re-render");
    return (
      <div className={style.app}>
        <Navbar />
        <main className="">
          <div className={style.tabs}>
            <div className={style.movie__tab}>Movies</div>
            <div className={style.fav__tab}>Favourite</div>
          </div>

          <div className="">
            {/* movieList render here inside MovieCard pass as props */}
            {movieList.map((movie,index) => {
              return (
                <MovieCard 
                  movie={movie} 
                  key={`movie${index}`} 
                  dispatch={store.dispatch}  
                  isFavourite={this.isFavourite(movie)}
                />
              )
            })}
          </div>

        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
