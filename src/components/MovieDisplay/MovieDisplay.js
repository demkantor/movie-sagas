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

  moreInfo = () => {
    console.log("in moreInfo");
  };

  addFav = () => {
    console.log("in addFav");
  };
 
  
  render() {
    return (
      <div className="movieDisplay">
        <div className="container">
          <div>
            {this.props.reduxState.movieReducer && (
              <div className="display">
                {this.props.reduxState.movieReducer.map(movie => (
                  <div className="gif" key={movie.id}>
                    <img alt="title" src={movie.poster} />
                    <br />
                    <div className="title">
                      {movie.title}
                      <br />
                      <button onClick={() => this.moreInfo()}>
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
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState
});

export default connect(putReduxStateOnProps)(MovieDisplay);