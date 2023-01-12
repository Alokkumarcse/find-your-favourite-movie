
import Navbar from '../navbar/Navbar';
import MovieCard from '../movie-card/MovieCard';
import Footer from '../footer/Footer';
import {data} from '../data/data';
import style from './App.module.css';
import { Component } from 'react';

class App extends Component {
  componentDidMount() {
    const {store} = this.props;
    // make an api call to fetch data
    // use the data and dispatch the action 
    store.dispatch({
      type:"ADD_MOVIE",
      movie: data,
    })

    console.log(store.getState());
  }


  render() {
    const {store} = this.props;
    return (
      <div className={style.app}>
        <Navbar />
        <main className="">
          <div className={style.tabs}>
            <div className={style.movie__tab}>Movies</div>
            <div className={style.fav__tab}>Favourite</div>
          </div>

          <div className="">
            {store.getState().map((movie) => {
              return (<MovieCard movie={movie} key={`${movie.Year}${movie.Title}`} />)
            })}
          </div>

        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
