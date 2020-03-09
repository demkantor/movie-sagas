import React, {Component} from 'react';
import '../App/App.css';


class MovieDetail extends Component {
  
    goHome=()=>{
      this.props.history.push('/')
    }

    //sends props to /edit 
    editThis = (movie) => {
        this.props.history.push({
          pathname: '/edit',
          state: {
            id: movie.id,
            title: movie.title,
            poster: movie.poster,
            hero: movie.hero,
            description: movie.description
          }
        });
      };

      
  render() {
      //console.log('in details', this.props.location.state)
      const movie = "https://www.youtube-nocookie.com/embed/" + this.props.location.state.video;
    
      return (
      <div className="moviedetail">
        <button  className="homeButton" onClick={this.goHome}>
            Home
        </button>
        <button onClick={() => this.editThis(this.props.location.state)}>
            Edit Details
        </button>
        <iframe className="playButton" width="155" height="125" title={this.props.location.state.title} src={movie} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
        {/* <img className="playButton" alt="play" src='/images/play.png'/> */}
        {this.props.location.state.favorited &&
          <img className="favorited" alt="star" src='/images/icons/star.png'/>
          }
        <h1 className="titleDetail">{this.props.location.state.title}</h1>
        <div className="heroDisplay" key={this.props.location.state.id}>
            <img className="heroImage" alt="hero" src={this.props.location.state.hero} width="1000px"/>
        </div>
        <div className="description">
            {this.props.location.state.description}
        </div>
      </div>
    );
  }
}

export default MovieDetail;