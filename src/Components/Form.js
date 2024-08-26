import React from 'react';
import './Form.css';


const Form = ({ onClose }) => {
  return (
    <div className="form-popup">
      <form>
        <h2>Input Form</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="phone">Email:</label>
        <input type="tel" id="phone" name="phone" required />
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default Form;
