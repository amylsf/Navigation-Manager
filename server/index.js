const express = require('express');
const app = express();
const parser = require('body-parser');
const port = 3000;
const db = '../database/index.js';


app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));


app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})

app.get('/navigation', (req, res) => {
  db.fetchLinks()
  .then((data) => {
    res.status(200).end(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).end();
  })
})

app.post('/navigation', (req, res) => {
  db.saveLink(req.body.link)
  .then(() => {
    res.status(201).end();
  })
  .catch((err) => {
    console.log(err);
    res.status(500).end();
  })
})