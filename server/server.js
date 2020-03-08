const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

// Route includes
const movieRouter = require('./routes/movie.router');
 const genreRouter = require('./routes/genre.router');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/movie', movieRouter);
 app.use('/genre', genreRouter);

/** ---------- START SERVER ---------- **/
/** Listen * */
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });