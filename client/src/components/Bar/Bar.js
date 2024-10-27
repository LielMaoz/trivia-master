import './Bar.css';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/Context';
import axios from 'axios';

const Bar = () => {
    const navigate = useNavigate();
    const { userLoggedIn, setUserLoggedIn } = useContext(LoginContext);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            if (userLoggedIn) {
                try {
                    /*console.log(
                        'Sending request to /api/name with email:',
                        userLoggedIn
                    );*/

                    const response = await axios.post(
                        'http://localhost:5000/api/name',
                        {
                            email: userLoggedIn,
                        }
                    );
                    if (response.data.success) {
                        /*console.log('changing the name');*/
                        setUsername(response.data.message); // Set the username
                        setMessage(''); // Clear any previous messages
                    } else {
                        setMessage(response.data.message); // Set error message
                    }
                } catch (error) {
                    console.error('Error finding username:', error);
                    setMessage('An error occurred while fetching your name.'); // Set error message
                }
            }
        };
        fetchUsername();
    }, [userLoggedIn]); // Fetch username whenever userLoggedIn changes

    const handleLogoClick = () => {
        navigate(`/`);
    };

    const handleLogOut = () => {
        setUserLoggedIn(null); // Adjust this based on your state management
        setMessage(''); // Optionally clear the message on logout
    };

    return (
        <div id='bar-container'>
            <div id='logo'>
                <img src='/images/logo.png' onClick={handleLogoClick} />
            </div>
            <div className='links-container'>
                {userLoggedIn ? (
                    <>
                        <button className='link' onClick={handleLogOut}>
                            Log out
                        </button>
                        <span id='username'> Hi {username} 👋</span>
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
