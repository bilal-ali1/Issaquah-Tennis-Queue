const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 1000;
const http = require('http');
const { Server } = require('socket.io');

// Create an HTTP server for Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://issaquah-tennis-queue.vercel.app/',
    methods: ['POST', 'GET'],
  },
});

// Middleware to parse JSON bodies
app.use(cors({ origin: 'https://issaquah-tennis-queue.vercel.app/' }));
app.use(express.json());

// In-memory data storage for parks with courts and reservation duration
const parks = {
  "Tibbetts Valley Park": {
    courts: [
      { courtId: 1, reservedBy: null, durationRemaining: null },
      { courtId: 2, reservedBy: null, durationRemaining: null },
      { courtId: 3, reservedBy: null, durationRemaining: null },
      { courtId: 4, reservedBy: null, durationRemaining: null },
    ],
  },
  "Central Park": {
    courts: [
      { courtId: 1, reservedBy: null, durationRemaining: null },
      { courtId: 2, reservedBy: null, durationRemaining: null },
    ],
  },
  "Meerwood Park": {
    courts: [
      { courtId: 1, reservedBy: null, durationRemaining: null },
    ],
  },
  "Black Nugget Park": {
    courts: [
      { courtId: 1, reservedBy: null, durationRemaining: null },
      { courtId: 2, reservedBy: null, durationRemaining: null },
    ],
  },
};

let users = [];

// WebSocket connection handler
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for reservation events and emit updates to all connected clients
  socket.on('reserveCourt', () => {
    io.emit('updateParks', parks); // Send updated parks data to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Function to handle decreasing the durationRemaining over time
const startReservationTimer = (selectedCourt, parkName) => {
  const interval = setInterval(() => {
    if (selectedCourt.durationRemaining > 0) {
      selectedCourt.durationRemaining -= 1; // Decrease the remaining time
      io.emit('updateParks', parks); // Emit updated parks data
    } else {
      // Clear reservation once the time is up
      selectedCourt.reservedBy = null;
      selectedCourt.durationRemaining = null;
      io.emit('updateParks', parks); // Emit updated parks data
      clearInterval(interval); // Stop the timer
    }
  }, 60000); // Update every 1 minute
};

// POST endpoint to add a new user to a specific court in a park
app.post('https://issaquah-tennis-queue.onrender.com/api/form', (req, res) => {
  console.log('Request received:', req.body);

  // Extract name, phone, park, court, and duration from the request body
  const { name, phone, park, court, duration } = req.body;

  const selectedPark = parks[park];
  const selectedCourt = selectedPark.courts.find((c) => c.courtId === parseInt(court));

  if (selectedCourt.reservedBy) {
    return res.status(400).json({
      error: `Court ${court} at ${park} is already reserved by ${selectedCourt.reservedBy}.`,
    });
  }

  // Set reservation data
  selectedCourt.reservedBy = name;
  selectedCourt.durationRemaining = parseInt(duration); // Store the duration as a number of minutes

  console.log(`User ${name} reserved Court ${court} at ${park} for ${duration} minutes`);

  // Start the timer for decreasing the durationRemaining
  startReservationTimer(selectedCourt, park);

  // Add user to the users array (for tracking or further logic)
  const newUser = { name, phone };
  users.push(newUser);

  // Emit the updated parks data to all connected clients
  io.emit('updateParks', parks);

  // Return success response
  return res.status(201).json({
    message: `User ${name} reserved Court ${court} for ${duration} minutes.`,
    user: newUser,
  });
});

// GET endpoint to fetch the parks data
app.get('https://issaquah-tennis-queue.onrender.com/api/parks', (req, res) => {
  res.json(parks); // Send the parks data to the frontend
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
