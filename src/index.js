import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import axios from 'axios'
// Provider allows us to use redux within our react app
import {Provider} from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import {takeEvery, put} from "redux-saga/effects";
import createSagaMiddleware from 'redux-saga';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMovie);
    yield takeEvery('EDIT_TITLE', editTitle);
    yield takeEvery('EDIT_FAV', editFav);
    yield takeEvery('GET_GENRES', getGenres);
}

function* getMovie(){
    const filmList = yield axios.get('/movie');
    console.log('this saga came from movie/GET bringing: ', filmList.data)
    yield put({type: 'SET_MOVIES', payload: filmList.data})
}

function* getGenres(){
    const genreList = yield axios.get('/genre');
    console.log('this saga came from genre/GET bringing: ', genreList.data)
    yield put({type: 'SET_GENRES', payload: genreList.data})
}

function* editTitle(edit){
    console.log('this saga came from movie/title/PUT, sending: ', edit.payload);
  try {
    yield axios.put(`/movie/title/${edit.payload.sendId}`, edit.payload);
    yield put({type: 'GET_MOVIES'});
  } catch (error) {
    console.log(error);
  }
}

function* editFav(edit){
    console.log('this saga came from movie/fav/PUT, sending: ', edit.payload);
  try {
    yield axios.put(`/movie/fav/${edit.payload}`, edit.payload);
    yield put({type: 'GET_MOVIES'});
  } catch (error) {
    console.log(error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movieReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genreReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movieReducer,
        genreReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
