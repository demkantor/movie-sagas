const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// return all movie genres
router.get('/', (req, res) => {
  //console.log("in server /genre/GET");
  const queryText = `SELECT * FROM "genres" ORDER BY "name" ASC`;
  pool.query(queryText)
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error on query ${error}`);
        res.sendStatus(500);
    });
});

// add a new genre
router.post('/', (req, res) => {
  //console.log("in server /genre/POST with: ", req.body);
  const genre = req.body.newGenre;
  const queryText = `INSERT INTO "genres" ("name") VALUES ($1)`;
  pool.query(queryText, [genre])
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing new genre post', err);
      res.sendStatus(500);
    });
});


// delete a genre
router.delete('/:id', (req, res) => {
  //console.log("in server /genre/DELETE with: ", req.params.id);
   const queryText = `DELETE FROM "genres" WHERE id=$1`;
  pool.query(queryText, [Number(req.params.id)])
  .then(() => {
    res.sendStatus(200);
  }).catch(err => {
      console.log("Error deleting genre", err);
      res.sendStatus(500);
    });
});


module.exports = router;