const express = require('express');
const app = express();
const parser = require('body-parser');
const port = 3000;


app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));


app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})