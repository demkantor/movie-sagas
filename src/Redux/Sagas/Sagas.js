import '../../index.css'
import '../../index'
import axios from 'axios'
import mainReducer from '../Reducers/Reducers';
import {createStore,  applyMiddleware} from 'redux';
import logger from 'redux-logger';

// Imported saga middleware
import {takeEvery, put} from "redux-saga/effects";
import createSagaMiddleware from 'redux-saga';

// Create sagaMiddlewareWelcome to the super secert awesome admin page
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
    mainReducer,
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

// these sagas take the dispatch and runs them before they get to the reducers
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMovie);
    yield takeEvery('EDIT_TITLE', editTitle);
    yield takeEvery('EDIT_FAV', editFav);
    yield takeEvery('GET_GENRES', getGenres);
    yield takeEvery('ADD_GENRES', addGenres);
    yield takeEvery('REMOVE_GENRE', removeGenre);
    yield takeEvery('ATTACH_GENRE', attachGenre);
    yield takeEvery('GET_COMBOS', getCombos);
    yield takeEvery('REMOVE_COMBO', removeCombo);
    yield takeEvery('GET_SPECIFICS', getSpecifics);
}

function* getMovie(){
    const filmList = yield axios.get('/movie');
    //console.log('this saga came from movie/GET bringing: ', filmList.data)
    yield put({type: 'SET_MOVIES', payload: filmList.data})
}

function* getGenres(){
    const genreList = yield axios.get('/genre');
    //console.log('this saga came from genre/GET bringing: ', genreList.data)
    yield put({type: 'SET_GENRES', payload: genreList.data})
}

function* getCombos(){
    const comboList = yield axios.get('/combo');
    //console.log('this saga came from /combo/GET bringing: ', comboList.data)
    yield put({type: 'SET_COMBOS', payload: comboList.data})
}

function* getSpecifics(id){
    //console.log('got the specific id:', id)
    const specificList = yield axios.get(`/combo/specific/${id.payload}`);
    //console.log('this saga came from /combo/specific/GET bringing: ', specificList.data)
    yield put({type: 'SET_SPECIFICS', payload: specificList.data})
}

function* editTitle(edit){
    //console.log('this saga came from movie/title/PUT, sending: ', edit.payload);
  try {
    yield axios.put(`/movie/title/${edit.payload.sendId}`, edit.payload);
    yield put({type: 'GET_MOVIES'});
  } catch (error) {
    console.log(error);
  }
}

function* editFav(edit){
    //console.log('this saga came from movie/fav/PUT, sending: ', edit.payload);
  try {
    yield axios.put(`/movie/fav/${edit.payload}`, edit.payload);
    yield put({type: 'GET_MOVIES'});
  } catch (error) {
    console.log(error);
  }
}

function* addGenres(genre) {
    //console.log('in saga /genre POST', genre.payload);
    try {
        yield axios.post('/genre', genre.payload);
        yield put({type: 'GET_GENRES'})
    } catch(error){
        console.log(error);
    }
}

function* removeGenre(remove) {
    console.log("in saga /genre/delete with: ", remove.payload);
    try {
        yield axios.delete(`/genre/${remove.payload}`);
        yield put({type: 'GET_GENRES'})
    } catch(error){
        console.log(error);
    }
}

function* removeCombo(remove) {
    console.log("in saga /combo/delete with: ", remove.payload);
    try {
        yield axios.delete(`/combo/${remove.payload}`);
        // yield put({type: 'GET_SPECIFICS'})
    } catch(error){
        console.log(error);
    }
}

function* attachGenre(edit){
    console.log('this saga came from /combo/PUT, sending: ', edit.payload.newGenreId.sendGenre.newGenre, "and", edit.payload.newGenreId.sendMovie);
  try {
    yield axios.post(`/combo`, edit.payload);
    // yield put({type: 'GET_SPECIFICS'});
  } catch (error) {
    console.log(error);
  }
}


export default (sagaMiddleware, storeInstance);
