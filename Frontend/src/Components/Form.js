import './Form.css';
import axios from 'axios';
import React, { useState } from 'react';



const Form = ({ onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [court, setCourt] = useState('');
  const [duration, setDuration] = useState('30 mins');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = { name, phone, court, duration };

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setName('');
        setPhone('');
        setCourt('')
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
      <form>
        <h2>Add Your Name to the List!</h2>
        <label htmlFor="name">Full Name:</label>
        <input type="text" id="name" name="name" required onChange={(e) => setName(e.target.value)}/>
        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" required onChange={(e) => setPhone(e.target.value)}/>
        <label htmlFor="duration">Select Duration: </label>
        <select 
        id="duration" 
        name="duration" 
        required 
        onChange={(e) => setDuration(e.target.value)}>
        <option value="30 mins">30 mins</option>
        <option value="45 mins">45 mins</option>
        <option value="1 hour">1 hour</option>
        </select>
        <label htmlFor="court">Select Court: </label>
        <select 
        id="court" 
        name="court" 
        required 
        onChange={(e) => setCourt(e.target.value)}>
        <option value="court">court</option>
        </select>
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default Form;
