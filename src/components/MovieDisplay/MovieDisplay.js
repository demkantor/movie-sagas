import React, {Component} from 'react';
import '../App/App.css';
import {connect} from 'react-redux';

class MovieDisplay extends Component {

  componentDidMount = () => {
    this.getMovies();
  };

  getMovies = () => {
    this.props.dispatch({ type: "GET_MOVIES" });
  };

  moreInfo = (movie) => {
    console.log("in moreInfo", movie);
    this.props.history.push({
      pathname: '/details',
      state: {
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        hero: movie.hero_poster,
        description: movie.description,
        favorited: movie.favorited
      }
    });
  };

  addFav = (thisOne) => {
    console.log("in addFav", thisOne);
    this.props.dispatch({ type: "EDIT_FAV", payload: {id: thisOne, bool: true }});
  };
 
  removeFav = (thisOne) => {
    console.log("in removeFav", thisOne);
    this.props.dispatch({ type: "EDIT_FAV", payload: {id: thisOne, bool: false }});
  };
  
  render() {
    return (
      <div className="movieDisplay">
        <img className="heroImage" alt="hero" src="/images/hero-avatar.jpg" width="1600px"/>
        {this.props.reduxState.movieReducer && (
          <div className="heroMain">
            {this.props.reduxState.movieReducer.map(hero => (
              <div className="heroDisplay" key={hero.id}>
                {/* <img className="heroImage" alt="hero" src={hero.hero_poster} width="1600px"/> */}
                </div>
                ))}
              </div>
            )}
          <div>
            {this.props.reduxState.movieReducer && (
              <div className="display">
                {this.props.reduxState.movieReducer.map(movie => (
                  <div className="poster" key={movie.id}>
                    <img alt="poster" src={movie.poster} width="185px" height="275px"/>
                    <br />
                    <div className="titleT">
                      {/* {movie.title} */}
                      <br/>
                      <br />
                      <button onClick={() => this.moreInfo(movie)}>
                        More Information
                      </button>
                      <br />
                      <br></br>
                        {movie.favorited === false &&
                        <button onClick={() => this.addFav(movie.id)}>
                          Add To Favorites
                        </button>
                        }
                        {movie.favorited === true &&
                        <button onClick={() => this.removeFav(movie.id)}>
                          Remove From Favorites
                        </button>
                        }
                      <br></br>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState
});

export default connect(putReduxStateOnProps)(MovieDisplay);