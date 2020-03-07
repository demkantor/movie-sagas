import React, {Component} from 'react';
import '../App/App.css';
import {Link} from 'react-router-dom';

class MovieEdit extends Component {

    state={
        edits: {
            title: '',
            description: ''
        }
    }
    
  editThis=(text)=>{
      console.log('text to change: ', text)
  }

  handleChangeFor=(propertyName, event)=>{
    this.setState({
        edits: {
          ...this.state.edits,
          [propertyName]: event.target.value
        }
      })
  }
    
  render() {
    // console.log('in edit', this.props.location.state)
    return (
      <div className="movieEdit">
        <Link to="/" className="displayLink">Back Home</Link>
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
        <button className="editButton" onClick={() => this.editThis(this.state)}>
            Submit Edit
        </button>
        <form className="edit">
            <input placeholder="Edit Title" onChange={(event) => this.handleChangeFor('title', event)}/>
                 <br/>
            <input className="largeEdit" placeholder="Edit Description" onChange={(event) => this.handleChangeFor('description', event)}/>
       </form>
      </div>
    );
  }
}

export default MovieEdit;