import React from 'react'
import './Card.css'

function Card(props) {
    return (
        <div className='card-container'>
            <div className='image-container'>
                <img src='/images/nyc.jpg' alt='image'/>
            </div>
            <div className='card-content'>
                <h1>{props.parkName}</h1>
                <h2>{props.location}</h2>
            </div>
        </div>
    );
}

export default Card;