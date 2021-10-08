const express = require('express');
const path = require('path');
const app = express();

const database = require('./lib/database');

app.use(express.static(path.join(__dirname, 'build'))); // Serves build production files
app.use(express.json());

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