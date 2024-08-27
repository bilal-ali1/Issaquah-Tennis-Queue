const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Brad' },
    { id: 3, name: 'Jane' },
  ];
  res.json(users);
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000`)
});

