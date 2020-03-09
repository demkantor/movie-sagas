const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// return all movie genres connections
router.get('/', (req, res) => {
  //console.log("in server /combo/GET");
  const queryText = `SELECT * FROM "movies_genres" ORDER BY "movies_id" ASC`;
  pool.query(queryText)
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error on combo query ${error}`);
        res.sendStatus(500);
    });
});

// return specific movie genres connections
router.get('/specific/:id', (req, res) => {
  //console.log("in server /combo/GET", Number(req.params.id));
  const queryText = `SELECT "genres"."name", "movies_genres"."id" FROM "genres" 
    JOIN "movies_genres" ON "movies_genres"."genres_id" = "genres"."id" 
    JOIN "movies" ON "movies_genres"."movies_id" = "movies"."id"
    WHERE "movies"."id" = $1;`;
  pool.query(queryText, [Number(req.params.id)])
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error on specific query ${error}`);
        res.sendStatus(500);
    });
});

// add a new genre connection
router.post('/', (req, res) => {
    //console.log('IN /combo/POST  WITH:', req.body, req.params);
    //console.log('movie id to change: ', req.body.newGenreId.sendMovie, "genre id to give it :", req.body.newGenreId.sendGenre.newGenre);
  const movie = Number(req.body.newGenreId.sendMovie);
  const genre = Number(req.body.newGenreId.sendGenre.newGenre);
  const queryText = `INSERT INTO "movies_genres" ("movies_id", "genres_id") VALUES ($1, $2)`;
  pool.query(queryText, [movie, genre])
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing new combo post', err);
      res.sendStatus(500);
    });
});


// delete a genre connection
router.delete('/:id', (req, res) => {
  //console.log("in server /combo/DELETE with: ", req.params.id);
  const queryText = `DELETE FROM "movies_genres" WHERE id=$1`;
  pool.query(queryText, [Number(req.params.id)])
  .then(() => {
    res.sendStatus(200);
  }).catch(err => {
    console.log("Error deleting movie to genre link", err);
    res.sendStatus(500);
  });
});


module.exports = router;