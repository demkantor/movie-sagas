const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// return all movies
router.get('/', (req, res) => {
  //console.log("in server /movie/GET");
  const queryText = `SELECT * FROM movies ORDER BY title ASC`;
  pool.query(queryText)
      .then( (result) => {
          res.send(result.rows);
      })
      .catch( (error) => {
          console.log(`Error on query ${error}`);
          res.sendStatus(500);
      });
});

//change title and description of a movie
router.put('/title/:id', (req, res) => {
  //console.log('IN PUT TITLE WITH:', req.body, req.params);
  //console.log('r.b.change: ', req.body.change.edits.title, "r.p.id :", req.params.id);
  const queryText = `UPDATE "movies" SET "title" =$1, "description" =$2 WHERE id=$3;`;
  const queryValues = [req.body.change.edits.title, req.body.change.edits.description, req.params.id]
  pool.query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log("Error changing input category", err);
      res.sendStatus(500);
    });
})

//add or remove movie from favorites
router.put('/fav/:id', (req, res) => {
  //console.log('IN PUT TITLE WITH:', req.body, req.params.id);
   const queryText = `UPDATE "movies" SET "favorited" =$1 WHERE id=$2;`;
    const queryValues = [req.body.bool, req.body.id]
  pool.query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log("Error changing input category", err);
      res.sendStatus(500);
    });
})

module.exports = router;