import React, { useState } from 'react'
import './Card.css'
import Form from './Form'

function Card({ image, parkName, location, courts }) {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

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
        <button className="card-button" onClick={toggleForm}>Book a time</button>
      </div>
      {showForm && <Form onClose={handleCloseForm} />}
    </div>
  );
}

export default Card;
