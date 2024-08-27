import React from 'react';
import './Form.css';


const Form = ({ onClose }) => {
  return (
    <div className="form-popup">
      <span className="close-button" onClick={onClose}>&times;</span>
      <form>
        <h2>Add Your Name to the List!</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
