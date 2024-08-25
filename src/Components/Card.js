import React from 'react'
import './Card.css'

function Card({ image, parkName, location, courts }) {
  return (
    <div className="card">
      <img src={image} alt={`${parkName}`} className="card-image" />
      <div className="card-body">
        <h2>{parkName}</h2>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Available Courts:</strong></p>
        <ul>
          {courts.map((court, index) => (
            <li key={index}>{court}</li>
          ))}
        </ul>
        <button className="card-button">Book a time</button>
      </div>
    </div>
  );
}

export default Card;
