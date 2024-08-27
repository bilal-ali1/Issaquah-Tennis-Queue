// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data storage
let users = [];

// POST endpoint to add a new user
app.post('/api/users', (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    phone,
    createdAt: new Date(),
  };

  users.push(newUser);

  return res.status(201).json({
    message: 'User added successfully.',
    user: newUser,
  });
});

// GET endpoint to retrieve all users
app.get('/api/users', (req, res) => {
  return res.status(200).json(users);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
