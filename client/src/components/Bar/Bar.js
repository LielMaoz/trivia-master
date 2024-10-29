import './Bar.css';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/Context';
import axios from 'axios';

const Bar = () => {
  const navigate = useNavigate();
  const { userLoggedIn, setUserLoggedIn } = useContext(LoginContext);

  //const [username, setUsername] = useState('');

  /*
  const fetchUsername = async () => {
    if (userLoggedIn) {
      try {
        const response = await axios.post('http://localhost:5000/api/name', {
          email: userLoggedIn,
        });
        if (response.data.success) {
          setUsername(response.data.data); // Set the username
        }
      } catch (error) {
        console.error('Error finding username:', error);
        alert('An error occurred while fetching your name.'); // Set error message
      }
    }
  };
  useEffect(() => {
    fetchUsername();
  }, [userLoggedIn]); // Fetch username whenever userLoggedIn changes
  */

  const handleLogoClick = () => {
    navigate(`/`);
  };

  const handleLogOut = () => {
    setUserLoggedIn(null); // Adjust this based on your state management
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
            <button className='link' onClick={handleLogOut}>
              Log out
            </button>
            <Link to='/Leaderboard/Leaderboard' className='link'>
              Leaderboard
            </Link>
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
