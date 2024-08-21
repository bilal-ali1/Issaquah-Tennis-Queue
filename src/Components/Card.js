import React from 'react'
import './Card.css'

function Card(props) {
    return (
        <div className='card-container'>
            <div className='image-container'>
                <img src='/images/nyc.jpg' alt='first'/>
            </div>
            <div className='card-content'>
                <h1>{props.parkName}</h1>
                <h3>{props.location}</h3>
                <h3>Court Availibility</h3>
                <h3>{props.availibility}</h3>
            </div>
            <div className='buttonContainer'>
                <button className='queueButton'>Join the queue</button>
            </div>
        </div>
    );
}

export default Card;