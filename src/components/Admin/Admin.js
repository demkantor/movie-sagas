import React, {Component} from 'react';
import '../App/App.css';
import {Link} from 'react-router-dom';


class Admin extends Component {
  
  render() {
    return (
      <div className="admin">
           <Link to="/" className="displayLink">Go Home</Link>
      </div>
    );
  }
}

export default Admin;