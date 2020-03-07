import React, {Component} from 'react';
import '../App/App.css';
import {Link} from 'react-router-dom';

class MovieEdit extends Component {

    
  
    
  render() {
    console.log('in edit', this.props.location.state)
    return (
      <div className="movieEdit">
        <Link to="/" className="displayLink">Home</Link>
        <h1 className="title">
            Curent Title: {this.props.location.state.title}
        </h1>
        <div className="posterDisplay" key={this.props.location.state.id}>
            <img className="poster" alt="poster" src={this.props.location.state.poster} />
        </div>
        <h3 className="title" >Current Description:</h3>
        <div className="descriptionEdit">
            {this.props.location.state.description}
        </div>
        <form className="edit">
           <input/>
           <br/>
           <input/>
       </form>
      </div>
    );
  }
}

export default MovieEdit;