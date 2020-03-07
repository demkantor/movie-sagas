import React, {Component} from 'react';
import './App.css';
import MovieDisplay from '../MovieDisplay/MovieDisplay';
import Header from '../Header/Header';
import MovieEdit from '../MovieEdit/MovieEdit';
import {HashRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <Header/>
          <Route exact path="/" component={MovieDisplay}/>
          <Route exact path="/edit" component={MovieEdit}/>
        </Router>
      </div>
    );
  }
}

export default App;
