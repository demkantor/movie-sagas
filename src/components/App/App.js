import React, {Component} from 'react';
import './App.css';
import MovieDisplay from '../MovieDisplay/MovieDisplay';
import Header from '../Header/Header';
import MovieEdit from '../MovieEdit/MovieEdit';
import MovieDetail from '../MovieDetail/MovieDetail';
import Admin from'../Admin/Admin'
import {BrowserRouter as Router, Route} from 'react-router-dom';






class App extends Component {

  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <Header/>
          <Route path="/header" component={Header}/>
          <Route exact path="/" component={MovieDisplay}/>
          <Route path="/edit" component={MovieEdit}/>
          <Route path="/details" component={MovieDetail}/>
          <Route path="/admin" component={Admin}/>
        </Router>
      </div>
    );
  }
}

export default App;
