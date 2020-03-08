const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// return all movie genres connections
router.get('/', (req, res) => {
  console.log("in server /combo/GET");
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

// add a new genre connection
router.post('/', (req, res) => {
    console.log('IN /combo/POST  WITH:', req.body, req.params);
    console.log('movie id to change: ', req.body.newGenreId.sendMovie, "genre id to give it :", req.body.newGenreId.sendGenre.newGenre);
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
  console.log("in server /combo/DELETE with: ", req.params.id);
//    const queryText = `DELETE FROM "genres" WHERE id=$1`;
//   pool.query(queryText, [Number(req.params.id)])
//   .then(() => {
//     res.sendStatus(200);
//   }).catch(err => {
//       console.log("Error deleting genre", err);
//       res.sendStatus(500);
//     });
});

//link a genre and movie together
router.put('/:id', (req, res) => {
  console.log('IN /combo/PUT  WITH:', req.body, req.params);
  console.log('movie id to change: ', req.body.newGenreId.sendMovie, "genre id to give it :", req.body.newGenreId.sendGenre.newGenre);
//   const queryText = `UPDATE "movies_genres" SET "title" =$1, "description" =$2 WHERE id=$3;`;
//    const queryValues = [req.body.change.edits.title, req.body.change.edits.description, req.params.id]
//   pool.query(queryText, queryValues)
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch(err => {
//       console.log("Error changing input category", err);
//       res.sendStatus(500);
    // });
})

module.exports = router;