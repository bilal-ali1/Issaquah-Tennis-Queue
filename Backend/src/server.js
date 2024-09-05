const express = require('express');
const cors = require('cors');
const app = express();
const port = 1000;

// Middleware to parse JSON bodies
 app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

// In-memory data storage for parks with queues based on the number of courts
let parks = {
  tibbettsValleyPark: Array(4).fill([]).map(() => []), // 4 courts
  centralPark: Array(2).fill([]).map(() => []),        // 2 courts
  meerwoodPark: Array(1).fill([]).map(() => []),       // 1 court
  blackNuggetPark: Array(2).fill([]).map(() => []),    // 2 courts
};

let users = { }

// POST endpoint to add a new user to a specific court in a park
app.post('/api/form', (req, res) => {
  console.log('Request received:', req.body);

  // Extract name and phone from the request body
  const { name, phone } = req.body;

  // Simulate adding the user (in a real application, you'd probably save this to a database
  const newUser = { name, phone };
  console.log(`User ${name} added with phone number ${phone}`);

  // Return success response
  return res.status(201).json({
    message: `User ${name} added successfully.`,
    user: newUser,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



