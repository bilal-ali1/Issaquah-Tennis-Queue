import './Form.css';
import React, { useEffect, useState } from 'react';



const Form = ({ parkName, numOfCourts, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCourt, setSelectedCourt] = useState(numOfCourts === 1 ? 1 : ''); 
  const [selectedDuration, setSelectedDuration] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (numOfCourts === 1) {
      setSelectedCourt(1);
    }
  }, [numOfCourts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = { name, phone, park: parkName, court: selectedCourt, duration: selectedDuration };

    try {
      const response = await fetch('https://issaquah-tennis-queue.onrender.com/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setName(name);
        setPhone(phone);
        setSelectedCourt(numOfCourts === 1 ? 1 : '');
        setSelectedDuration('');
        alert('Sucess! Your reservation has been made.');
        onClose();
      } else {
        alert(result.error || 'Failed to add user.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="form-popup">
      <span className="close-button" onClick={onClose}>&times;</span>
      <form onSubmit={handleSubmit}>
        <h2>Reserve a Court at {parkName}</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required onChange={(e) => setName(e.target.value)}/>
        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" required onChange={(e) => setPhone(e.target.value)}/>
        {numOfCourts > 1 && (
          <div>
            <label htmlFor="court">Select Court:</label>
            <select
              id="court"
              name="court"
              required
              value={selectedCourt}
              onChange={(e) => setSelectedCourt(e.target.value)}
            >
              <option value="" disabled>Select a court</option>
              {Array.from({ length: numOfCourts }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  Court {index + 1}
                </option>
              ))}
            </select>
          </div>
        )}
        <label htmlFor="duration">Select Duration:</label>
        <select
          id="duration"
          name="duration"
          required
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
        >
          <option value="" disabled>Select duration</option>
          <option value="30 minutes">30 minutes</option>
          <option value="45 minutes">45 minutes</option>
          <option value="60 minutes">60 minutes</option>
        </select>
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default Form;
