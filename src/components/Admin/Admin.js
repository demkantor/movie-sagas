import React, {Component} from 'react';
import '../App/App.css';


class Admin extends Component {

  goHome=()=>{
    this.props.history.push('/')
  }
  
  render() {
    return (
      <div className="admin">
        <button className="homeButton" onClick={this.goHome}>
            Home
        </button>
      </div>
    );
  }
}

export default Admin;