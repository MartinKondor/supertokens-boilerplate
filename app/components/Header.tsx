"use client";
import React from 'react';

const Header: React.FC = ({ title }) => {
    return (
        <div>
            <h1 style={{ color: "rgb(90,90,110)" }}>
                SuperTokens Template
            </h1>
            <h2>
                <span style={{ marginLeft: 10 }}>{title}</span>
            </h2>
        </div>
    );
};

export default Header;