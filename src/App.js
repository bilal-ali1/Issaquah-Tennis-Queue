import React from 'react';
import './App.css';
import Card from './Components/Card';

function App() {
  return (
    <div className='card-content'>
      <div>
      <Card parkName="Central Park" location="New York City, New York" availibility="Court 1: Open" />
    </div>
      <div>
      <Card parkName="Griffith Park" location="Los Angeles, California" availibility="Court 1: Open" />
      </div>
    </div>
  );
}

export default App;

