import React from 'react';
import './Spinner.css'

const spinner = () => {
    return (
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    );
}

export default spinner;