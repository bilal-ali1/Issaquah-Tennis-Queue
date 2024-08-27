import React from 'react';
import Navbar from './Components/Navbar';
import Card from './Components/Card';
import './App.css';

function App() {
  const parks = [
    {
      image: '/images/nyc.jpg', 
      parkName: 'Central Park',
      location: '1907 NE Park Dr, Issaquah, WA',
      courts: [['Court 1: ', '30 mins'], ['Court 2: ', '1 hr']]
    },
    {
      image: '/images/park2.webp',
      parkName: 'Black Nugget Park',
      location: '1953 24th Ave NE, Issaquah, WA',
      courts: [['Court 1: ', '30 mins'] , ['Court 2: ', 'Open']]
    },
    {
      image: '/images/park3.jpg',
      parkName: 'Meerwood Park',
      location: '4703 192nd Ave SE, Issaquah, WA',
      courts: [['Court 1: ', '1 hr']]
    },
    {
      image: '/images/park3.jpg',
      parkName: 'Tibbetts Valley Park',
      location: '965 12th Ave NW, Issaquah, WA',
      courts: [['Court 1: ', '1 hr'], ['Court 2: ', '30 min'], ['Court 3:', '1 hr'], ['Court 4:', '30 min']]
    }
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


