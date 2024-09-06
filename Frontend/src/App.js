import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Card from './Components/Card';
import './App.css';

function App() {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch parks data from the backend
  const fetchPparksData = async () => {
    try {
      const response = await fetch('http://localhost:1000/api/parks');
      if (!response.ok) {
        throw new Error('Failed to fetch parks data');
      }
      const data = await response.json();

      // Convert backend structure to match the frontend structure
      const updatedParks = Object.keys(data).map((parkName) => {
        let location = '';
        let image = '';

        // Set locations and images for parks
        switch (parkName) {
          case 'Central Park':
            location = '1907 NE Park Dr, Issaquah, WA';
            image = '/images/nyc.jpg';
            break;
          case 'Black Nugget Park':
            location = '1953 24th Ave NE, Issaquah, WA';
            image = '/images/park2.webp';
            break;
          case 'Meerwood Park':
            location = '4703 192nd Ave SE, Issaquah, WA';
            image = '/images/park3.jpg';
            break;
          case 'Tibbetts Valley Park':
            location = '965 12th Ave NW, Issaquah, WA';
            image = '/images/park3.jpg';
            break;
          default:
            break;
        }

        // Update the courts array to include duration information
        return {
          parkName,
          location,
          image,
          courts: data[parkName].courts.map((court) => {
            const status = court.reservedBy
              ? `Reserved by ${court.reservedBy} ~ ${court.durationRemaining} min left`
              : 'Open';
            return `Court ${court.courtId}: ${status}`;
          }),
        };
      });

      setParks(updatedParks);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Polling with useEffect: fetch the parks data every 5 seconds
  useEffect(() => {
    fetchPparksData(); // Fetch the data immediately on component mount

    const interval = setInterval(() => {
      fetchPparksData(); // Poll the backend every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <Navbar />
      <h1 className="title">Parks Nearby</h1>
      <div className="card-grid">
        {parks.map((park, index) => (
          <Card
            key={index}
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
