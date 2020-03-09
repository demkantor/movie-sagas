import {combineReducers} from 'redux';
import '../../index.css'
import '../../index'


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

//Used to store movie/genre links
const comboReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_COMBOS':
            return action.payload;
        default:
            return state;
    }
}

//Used to store specific movie/genre links
const specificReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SPECIFICS':
            return action.payload;
        default:
            return state;
    }
}

//package up all reducers and send to index.js for use across app
    const mainReducer = combineReducers({
        movieReducer,
        genreReducer,
        comboReducer,
        specificReducer
    });

export default (mainReducer);