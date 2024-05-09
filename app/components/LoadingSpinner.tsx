"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const LoadingSpinner: React.FC = () => {
    return (
        <div style={{fontWeight: 300, fontSize: 22, color: "rgb(170, 170, 170)"}}>
            <FontAwesomeIcon icon={faSpinner} spin />
            <span style={{margin: 10}}>Loading...</span>
        </div>
    );
};
