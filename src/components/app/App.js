
import Navbar from '../navbar/Navbar';
import MovieCard from '../movie-card/MovieCard';
import Footer from '../footer/Footer';
import {data} from '../data/data';
import style from './App.module.css';

function App() {
  return (
    <div className={style.app}>
      <Navbar />
      <main className="">
        <div className={style.tabs}>
          <div className={style.movie__tab}>Movies</div>
          <div className={style.fav__tab}>Favourite</div>
        </div>

        <div className="">
          {data.map((movie) => {
            return (<MovieCard movie={movie} key={`${movie.Year}${movie.Title}`} />)
          })}
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default App;
