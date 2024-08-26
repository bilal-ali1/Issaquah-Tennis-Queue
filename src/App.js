import React from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import './App.css';

function App() {
  const parks = [
    {
      image: '/images/nyc.jpg', 
      parkName: 'Central Park',
      location: '123 Park Ave, New York, NY',
      courts: ['Court 1: 30 mins', 'Court 2: 1 hr', 'Court 3: Open']
    },
    {
      image: '/images/park2.webp',
      parkName: 'Riverside Park',
      location: 'Riverside Dr, New York, NY',
      courts: ['Court 1: 30 mins', 'Court 2: Open', 'Court 3: Open']
    },
    {
      image: '/images/park3.jpg',
      parkName: 'Prospect Park',
      location: 'Prospect Park West, Brooklyn, NY',
      courts: ['Court 1: 1 hr', 'Court 2: 1 hr', 'Court 3: 30 mins']
    },
  ];

  return (
    <div className="App">
      <Navbar />
      <h1 className="title">Parks Nearby</h1>
      <div className="card-grid">
        {parks.map((park, availibility) => (
          <Card
            key={availibility}
            image={park.image}
            parkName={park.parkName}
            location={park.location}
            courts={park.courts}
          />
        ))}
      </div>
    </div>
  );
}

export default App;


