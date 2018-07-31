const express = require('express');
const app = express();
const parser = require('body-parser');
const port = 3000;
const db = require('../database/index.js');


app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
})

//fetches links from db and returns them to client
app.get('/navigation', (req, res) => {
  db.fetchLinks()
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    res.status(500).end();
  })
})

//saves a new link to db
app.post('/navigation', (req, res) => {
  db.saveLink(req.body.link)
  .then(() => {
    res.status(201).end();
  })
  .catch((err) => {
    res.status(500).end();
  })
})

//updates link info from client to db
app.put('/navigation', (req, res) => {
  db.updateLink(req.body.link)
  .then(() => {
    res.status(201).end();
  })
  .catch((err) => {
    res.status(500).end();
  })
})

//removes link
app.delete('/navigation', (req, res) => {
  db.removeLink(req.query.id)
  .then(() => {
    res.status(200).end();
  })
  .catch((err) => {
    res.status(500).end();
  })
})
