const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// return all movies
router.get('/', (req, res) => {
  console.log("in server /movie/GET");
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

// add a new favorite 
router.post('/', (req, res) => {
  console.log("in server post with: ", req.body);
//   const newFavorite = req.body;
//   const queryText = `INSERT INTO favorites ("title", "url", "category_id")
//                     VALUES ($1, $2, $3)`;
//   const queryValues = [
//     newFavorite.sendTitle,
//     newFavorite.sendUrl,
//     newFavorite.sendCat
//   ];
//   pool.query(queryText, queryValues)
//     .then(() => { res.sendStatus(201); })
//     .catch((err) => {
//       console.log('Error completing SELECT favorite query', err);
//       res.sendStatus(500);
//     });
});


// delete a favorite
router.delete('/:id', (req, res) => {
  console.log("in server delete with: ", req.params.id);
//   const queryText = "DELETE FROM favorites WHERE id=$1";
//   pool.query(queryText, [req.params.id])
//   .then(() => {
//     res.sendStatus(200);
//   }).catch(err => {
//       console.log("Error deleting favorite", err);
//       res.sendStatus(500);
//     });
});

router.put('/:id', (req, res) => {
  console.log('IN PUT WITH:', req.body, req.params);
  console.log('r.b.change: ', req.body.change.edits.title, "r.p.id :", req.params.id);
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

module.exports = router;