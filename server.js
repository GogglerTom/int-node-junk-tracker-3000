const express = require('express');
const path = require('path');
const app = express();

const database = require('./lib/database');

// Accepts requests from http://localhost:3000 through CORS.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', "PUT, POST, GET, DELETE, OPTIONS");
  if (req.method === 'OPTIONS') {
      res.sendStatus(200);
  } else {
      next();
  }
});

app.use(express.static(path.join(__dirname, 'build'))); // Serves build production files
app.use(express.json());

app.get('/test',(req, res) => {
  res.json([])
});

app.get('/vehicles', (req, res) => {
  res.json(database.all() || []);
});

app.get('/vehicles/:id', (req, res) => {
  res.json(database.find(parseInt(req.params.id, 10)) || {});
});

app.post('/vehicles', (req, res) => {
  res.json(database.create(req.body));
});

app.put('/vehicles/:id', (req, res) => {
  res.json(database.update(parseInt(req.params.id, 10), req.body));
});

app.delete('/vehicles/:id', (req, res) => {
  res.json(database.destroy(parseInt(req.params.id, 10)));
});

// Serves build production files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3001, () => {
  console.log('Server is now listening on port 3001');
});