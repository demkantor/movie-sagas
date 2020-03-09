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

  //sends props to /details
  moreInfo = (movie) => {
    //console.log("in moreInfo", movie);
    this.props.history.push({
      pathname: '/details',
      state: {
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        hero: movie.hero_poster,
        description: movie.description,
        favorited: movie.favorited,
        video: movie.youtube
      }
    });
  };

  //adds movie to favorites
  addFav = (thisOne) => {
    //console.log("in addFav", thisOne);
    this.props.dispatch({ type: "EDIT_FAV", payload: {id: thisOne, bool: true }});
  };
 
  //removes movie from favorites
  removeFav = (thisOne) => {
    //console.log("in removeFav", thisOne);
    this.props.dispatch({ type: "EDIT_FAV", payload: {id: thisOne, bool: false }});
  };

  //buttons for controlling left and right scroll action
  scrollTime=(direction)=>{
    //console.log('moving', direction);
    let container = document.getElementsByClassName('display')[0]
    let scrollAmount = 0;
    let slideTimer = setInterval(function(){
        if(direction === 'left'){
            container.scrollLeft -= 400;
        } else {
            container.scrollLeft += 400;
        }
        scrollAmount += 400;
        if(scrollAmount >= 500){
            window.clearInterval(slideTimer);
        }
    }, 1);
  }
  
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
                    <img className="moreDetails" alt="poster" src={movie.poster} onClick={() => this.moreInfo(movie)} width="185px" height="275px"/>
                    <br />
                    <div className="titleT">
                      {/* {movie.title} */}
                      <br></br>
                        {movie.favorited === false &&
                        <button className="favButton" onClick={() => this.addFav(movie.id)}>
                          Add To Favorites
                        </button>
                        }
                        {movie.favorited === true &&
                        <button className="favButton" onClick={() => this.removeFav(movie.id)}>
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
          <img alt="left arrow" src="/images/left.png" className="leftButton" onClick={(event)=>this.scrollTime('left', event)}/>
          <img alt="right arrow" src="/images/right.png" className="rightButton" onClick={(event)=>this.scrollTime('right', event)}/>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState
});

export default connect(putReduxStateOnProps)(MovieDisplay);