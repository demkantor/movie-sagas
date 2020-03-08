import React, {Component} from 'react';
import '../App/App.css';
import {Link} from 'react-router-dom';


class MovieDetail extends Component {
  

    editThis = (movie) => {
        console.log("in moreInfo", movie);
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
      console.log('in details', this.props.location.state)
    return (
      <div className="moviedetail">
        <Link to="/" className="displayLink">Back Home</Link>
        <button onClick={() => this.editThis(this.props.location.state)}>
            Edit Details
        </button>
        <h1>{this.props.location.state.title}</h1>
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