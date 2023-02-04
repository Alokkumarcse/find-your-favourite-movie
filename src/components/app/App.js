import React, { Component } from 'react';

// importing styles for App component
import style from './App.module.css';
// importing various components 
import Navbar from '../navbar/Navbar';
import MovieCard from '../movie-card/MovieCard';
// we use some static data as of now bcz not making any api call to get data.
import {data} from '../data/data';

// importing some actions
import { addMovieIntoMovieListAction, showFavouriteTabAction } from '../../actions';
// importing context form index.js
import { StoreContext } from '../../index';
// // not need of StoreContext anymore bcz I am using the connectComponent way to get Redux store
// // so need to  import connect() method from /src/index.js
// import {connect} from '../../index'; 
// import {connect} from 'react-redux';

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
    store.dispatch(addMovieIntoMovieListAction(data)); 

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
    // console.log(this.props);
    const {store} = this.props;
    // our store state looks like this { movieState:{}, searchState:{} } bcz of combining of many reducer in one rootReducer.
    const {movieState, searchState} = store.getState();

    // { movieList: [], favouriteList: [], showFavouriteTab:boolean } in our movieState's data, so access by moviesState object.
    const {movieList, favouriteList, showFavouriteTab } = movieState; 
    /** { result:{}, showSearchedMovie:boolean} in our searchState'data, so it is access by searchState object. */
    const { result, showSearchedMovie } = searchState;

    //select which list is going to shown
    const displayList = showFavouriteTab ? favouriteList: movieList;
    
    // console.log(this.props.store.getState());
    // console.log("Re-render");

    /** jsx of App ui */
    return (
      <div className={style.app}>
        {/* Rendering Navbar component here */}
        <Navbar resultData={result} showSearchedMovie={showSearchedMovie} />

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
                  dispatch={this.props.store.dispatch}  
                  isFavourite={this.isFavourite(movie)}
                />
              )})
            }
          </div>
          {/* this logic for show message when favourite list is empty and we click on the favourite tab */}
          {
            displayList.length === 0 
            ? <div style={{textAlign:"center", padding:"10px", fontSize:"16px"}}>No movie in Favourite list:)</div>
            : null
          }
        </main>
      </div>
    );
  }
}

/** Create AppWrapper to use store everywhere in App components.
 * store come through context Consumer.
 * whenever any value changed in store than app going to re-render.
*/
class AppWrapper extends React.Component {
  render(){
    return (
      <StoreContext.Consumer>
        { (store) => <App store={store} />}
      </StoreContext.Consumer>
    )
  }
}
export default AppWrapper;

/** Here Implementing the connectedComponent using connect() method to connect the Redux store and pass
 * the store state data as pops to component which is pass as argument.
 * connect method taking callback() method and component as argument and return a new connectedComponent.
 * connect() method by default pass the Dispatch method as props to component.
 * only those component will re-render which is connected, whenever the used store data will changed.
 * callback() method renamed as stateMapToStore().
 * 
 * Now here, use connected component so no need of Wrap the App component ie AppWrapper component. 
 */
// callback function which is returning the redux store state. which is pass as props to App component.
// function mapStateToStore(state){
//   return {
//     movieState: state.moviesReducer,
//     searchState: state.searchReducer,
//   }
// }
// // connectedComponent = connect(callback)(component)
// const ConnectedAppComponent = connect(mapStateToStore)(App);
// export default ConnectedAppComponent;
