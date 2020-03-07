import React, {Component} from 'react';
import './App.css';
import MovieDisplay from '../MovieDisplay/MovieDisplay';
import Header from '../Header/Header';
import MovieEdit from '../MovieEdit/MovieEdit';
import MovieDetail from '../MovieDetail/MovieDetail';
import {BrowserRouter as Router, Route} from 'react-router-dom';






class App extends Component {

  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <Header/>
          <Route exact path="/" component={MovieDisplay}/>
          <Route path="/edit" component={MovieEdit}/>
          <Route path="/details" component={MovieDetail}/>
        </Router>
      </div>
    );
  }
}

export default App;
