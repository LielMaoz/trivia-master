import React from 'react';
import './PopUp.css';
import { useNavigate } from 'react-router-dom';

const PopUp = ({ text, onClose }) => {
    const navigate = useNavigate();
    const navToLogin = () => {
        navigate('/Login/Login');
    };

    return (
        <div className='popup-overlay'>
            <div className='popup-content'>
                <p>{text}</p>
                <button onClick={onClose}>Close</button>
                <button onClick={navToLogin}>Go to login page</button>
            </div>
        </div>
    );
};

export default PopUp;
