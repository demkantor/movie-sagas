import React, {Component} from 'react';
import '../App/App.css';
import {connect} from 'react-redux';





class Admin extends Component {

  componentDidMount=()=>{
    this.getGenres();
  }

  getGenres=()=>{
    this.props.dispatch({type: 'GET_GENRES'});
  }

  goHome=()=>{
    this.props.history.push('/')
  }

  removeMe=(id)=>{
    console.log('remove me', id)
  }
  
  render() {
    console.log('in admin with genres: ', this.props.reduxState.genreReducer);
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
            <input placeholder="Add new Genre"/>
            <button onClick={this.addGenre}>
             Add Genre
            </button>
          </form>
          <img alt="hal" src="images/hal.jpg" width="700px"/>
        </div>
      </div>
    );
  }
}


const putReduxStateOnProps = (reduxState) => ({
  reduxState
});

export default connect(putReduxStateOnProps)(Admin);