const express = require('express');
const app = express();
const port = process.env.PORT || 9000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data storage for parks with queues based on the number of courts
let parks = {
  tibbettsValleyPark: Array(4).fill([]).map(() => []), // 4 courts
  centralPark: Array(2).fill([]).map(() => []),        // 2 courts
  meerwoodPark: Array(1).fill([]).map(() => []),       // 1 court
  blackNuggetPark: Array(2).fill([]).map(() => []),    // 2 courts
};

// POST endpoint to add a new user to a specific court in a park
app.post('/api/parks/:parkName/courts/:courtId/users', (req, res) => {
  const { name, phone } = req.body;
  const { parkName, courtId } = req.params;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }

  const courtIndex = parseInt(courtId) - 1;

  if (!parks[parkName] || !parks[parkName][courtIndex]) {
    return res.status(404).json({ error: 'Park or court not found.' });
  }

  const newUser = {
    id: Date.now(), // Unique ID based on timestamp
    name,
    phone,
    createdAt: new Date(),
  };

  parks[parkName][courtIndex].push(newUser);

  return res.status(201).json({
    message: `User added to ${parkName} - Court ${courtId} successfully.`,
    user: newUser,
  });
});

// GET endpoint to retrieve all users from a specific court in a park
app.get('/api/parks/:parkName/courts/:courtId/users', (req, res) => {
  const { parkName, courtId } = req.params;

  const courtIndex = parseInt(courtId) - 1;

  if (!parks[parkName] || !parks[parkName][courtIndex]) {
    return res.status(404).json({ error: 'Park or court not found.' });
  }

  return res.status(200).json(parks[parkName][courtIndex]);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

console.log(parks);
