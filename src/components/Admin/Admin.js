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
  
  render() {
    console.log('in admin with genres: ', this.props.reduxState.genreReducer);
    return (
      <div className="admin">
        <button className="homeButton" onClick={this.goHome}>
            Home
        </button>
      </div>
    );
  }
}


const putReduxStateOnProps = (reduxState) => ({
  reduxState
});

export default connect(putReduxStateOnProps)(Admin);