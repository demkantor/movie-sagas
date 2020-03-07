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
        description: movie.description
      }
    });
  };

  addFav = () => {
    console.log("in addFav");
  };
 
  
  render() {
    return (
      <div className="movieDisplay">
        {this.props.reduxState.movieReducer && (
          <div className="heroMain">
            {this.props.reduxState.movieReducer.map(hero => (
              <div className="heroDisplay" key={hero.id}>
                <img className="heroImage" alt="hero" src={hero.hero_poster} />
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
                      <button onClick={() => this.addFav()}>
                        Add To Favorites
                      </button>
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