import './Bar.css';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/Context';

const Bar = () => {
    const navigate = useNavigate();
    const { userLoggedIn, setUserLoggedIn } = useContext(LoginContext);

    const handleLogoClick = () => {
        navigate(`/`);
    };

    const handleLogOut = () => {
        setUserLoggedIn(null); // Adjust this based on your state management
        navigate(`/`);
    };

    return (
        <div id='bar-container'>
            <div id='logo'>
                <img src='/images/logo.png' onClick={handleLogoClick} />
            </div>
            <div className='links-container'>
                {userLoggedIn ? (
                    //in the <> : <span id='username'> Hi {userLoggedIn.username} 👋</span>
                    <>
                        <Link to='/Leaderboard/Leaderboard' className='link'>
                            Leaderboard
                        </Link>
                        <button className='link' onClick={handleLogOut}>
                            Log out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to='/Login/Login' className='link'>
                            Login
                        </Link>
                        <Link to='/Signup' className='link'>
                            Sign up
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Bar;
