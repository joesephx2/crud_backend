const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const backendEnv = process.env.BACKEND_ENV || 'development';
const knex = require('knex')(require('../knexfile.js')[backendEnv]);
const cors = require('cors');


app.use(express.json());
app.use(cors())


app.get('/servercheck', (req, res) => {
  res.send('ExpressJS running')
});

app.get('/', function(req, res, next) {
    knex.select().table('tests')
    .then(response => res.status(200).json(response))
    .catch(err => res.status(404).send("There was an error"))
});

app.post('/', (req, res) => {
    if (Object.keys(req.body).length === 12) {
        knex('tests').insert(req.body)
            .then(response => {
            console.log(response)
            res.status(200).send("added test")
            })
            .catch(err => {
            console.log(err)
            res.status(404).send("There was an error")
            })
    } else {
      res.status(400).send("all fields must be filled out")
    }
});

app.put('/', (req, res) => {
    if (req.body.test_id && Object.keys(req.body).length > 1) {
      knex('tests')
        .where('test_id', '=', req.body.test_id)
        .update(req.body)
        .then(response => {
        console.log(response)
        res.status(200).send("updated test")
        })
        .catch(err => {
        console.log(err)
        res.status(404).send("There was an error")
        })
    } else {
      res.status(400).send("must have a test_id or some type of info")
    }
});

app.delete('/', (req, res) => {
  if (req.body.test_id) {
    knex('tests')
    .where('test_id', '=', req.body.test_id)
    .del()
    .then(() => res.status(200).send("Item deleted"))
    .catch(err => res.status(404).send("There was error, maybe the test_id was invalid"))
  } else {
    res.status(400).send("must have a test_id")
  }
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});