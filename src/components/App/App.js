import React, {Component} from 'react';
import './App.css';
import MovieDisplay from '../MovieDisplay/MovieDisplay';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <MovieDisplay />
      </div>
    );
  }
}

export default App;
