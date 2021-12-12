import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import'./Loading.css'

const ProgressSpinnerDemo = () => {
    return (
        <div>
            <div className="Loading">
                <h5>Loading...</h5>
                <ProgressSpinner />
            </div>
        </div>
    );
}

export default ProgressSpinnerDemo;