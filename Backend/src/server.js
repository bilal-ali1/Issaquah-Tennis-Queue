const express = require('express');
const cors = require('cors');
const app = express();
const port = 1000;
const http = require('http');
const { Server } = require('socket.io');


// Create an HTTP server for Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware to parse JSON bodies
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

// In-memory data storage for parks with queues based on the number of courts
const parks = {
  "Tibbetts Valley Park": {
    courts: [
      { courtId: 1, reservedBy: null },
      { courtId: 2, reservedBy: null },
      { courtId: 3, reservedBy: null },
      { courtId: 4, reservedBy: null }
    ]
  },
  "Central Park": {
    courts: [
      { courtId: 1, reservedBy: null },
      { courtId: 2, reservedBy: null }
    ]
  },
  "Meerwood Park": {
    courts: [
      { courtId: 1, reservedBy: null }
    ]
  },
  "Black Nugget Park": {
    courts: [
      { courtId: 1, reservedBy: null },
      { courtId: 2, reservedBy: null }
    ]
  }
};

let users = [ ];


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

// POST endpoint to add a new user to a specific court in a park
app.post('/api/form', (req, res) => {
  console.log(parks);
  console.log('Request received:', req.body);

  // Extract name and phone and park and court from the request body
  const { name, phone, park, court } = req.body;

  const selectedPark = parks[park];
  const selectedCourt = selectedPark.courts.find(c => c.courtId === parseInt(court));

  if (selectedCourt.reservedBy) {
    return res.status(400).json({ error: `Court ${court} at ${park} is already reserved by ${selectedCourt.reservedBy}.` });
  }

  selectedCourt.reservedBy = name;

  console.log(selectedCourt);


  console.log(`User ${name} reserved Court ${court} at ${park} with phone number ${phone}`);
  console.log(parks[park]);



  // Simulate adding the user (in a real application, you'd probably save this to a database
  const newUser = { name, phone };
  users.push(newUser);
  // console.log(`User ${name} added with phone number ${phone}`);

  // Return success response
  return res.status(201).json({
    message: `User ${name} added successfully.`,
    user: newUser,
  });
});

// GET endpoint to fetch the parks data
app.get('/api/parks', (req, res) => {
  res.json(parks); // Send the parks data to the frontend
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




