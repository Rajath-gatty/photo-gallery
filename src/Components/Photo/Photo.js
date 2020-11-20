import React from 'react';
import './Photo.css'
const photo = (props) => {
    return (

        <div className="wrapper">
            <img src={props.image} alt=" " />
            <p className="lead"><span>Downloads : </span> {props.downloads}</p>
            <p className="lead"><span>Likes : </span>{props.likes}</p>
            <a href={props.visitPage} target="_about">View Image</a>
        </div>
    );
}

export default photo;