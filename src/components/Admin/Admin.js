import React, {Component} from 'react';
import '../App/App.css';
import {connect} from 'react-redux';





class Admin extends Component {

  state={
    newGenre: ''
  }

  componentDidMount=()=>{
    this.getGenres();
  }

  //gets all genres from database
  getGenres=()=>{
    this.props.dispatch({type: 'GET_GENRES'});
  }

  goHome=()=>{
    this.props.history.push('/');
  }

  //removes genre from database and DOM
  removeMe=(id)=>{
    this.props.dispatch({type: 'REMOVE_GENRE', payload: id});
  }
  
  handleChange=(genre, event)=>{
    this.setState({
      newGenre: event.target.value
    })
  }

  //takes input, saves new genre to database, displays to DOM
  addGenre=(event)=>{
    event.preventDefault();
    this.props.dispatch({type: 'ADD_GENRES', payload: this.state});
  }

  render() {
    return (
      <div className="admin">
        <button className="homeButton" onClick={this.goHome}>
            Home
        </button>
        <h1 className="title">Welcome to the super secert awesome admin page</h1>
        <br/>
        <div className="adminColumnOne">
          <table className="genreList">
            <thead>
              <tr>
                <th>Genre</th>
                <th></th>
              </tr>
            </thead>
              {this.props.reduxState.genreReducer && (
                <tbody>
              {this.props.reduxState.genreReducer.map(genre => (
                  <tr className="genreList" key={genre.id}>
                    <td>{genre.name}</td>
                    <td><button className="removeButton" onClick={()=>this.removeMe(genre.id)}>remove</button></td>
                  </tr>
                  ))}
                </tbody>
                )}
          </table>  
        </div>
        <div className="adminColumnTwo">
          <form>
            <input placeholder="Add new Genre" onChange={(event) => this.handleChange('genre', event)} />
            <button onClick={(event)=>this.addGenre(event)}>
             Add Genre
            </button>
          </form>
          <img className="hal" alt="hal" src="images/hal.jpg" width="700px"/>
        </div>
      </div>
    );
  }
}


const putReduxStateOnProps = (reduxState) => ({
  reduxState
});

export default connect(putReduxStateOnProps)(Admin);