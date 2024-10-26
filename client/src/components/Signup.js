import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login/form.css';
import axios from 'axios';
import { LoginContext } from '../context/Context';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { userLoggedIn, setUserLoggedIn } = useContext(LoginContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //change to something else to check if they are valid
    if (!username || !password || !email) {
      alert('Please fill all the boxes');
    } else {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/register',
          {
            email,
            username,
            password,
          }
        );
        if (response.data.success) {
          alert('User registered successfully!');
          setUserLoggedIn(email);
          console.log(userLoggedIn);
          navigate(`/`);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status == 400) {
          console.error('Error registering user:', error.response.data.message);
          alert(error.response.data.message);
        } else {
          console.error('Error registering user:', error);
          alert('An error occurred during registration.');
        }
      }
    }
  };

  return (
    <div>
      <h1>Sign up Page</h1>

      <form className='form-align' onSubmit={handleSubmit}>
        <div className='form-input'>
          <label>
            Choose your username:
            <input
              id='userName'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter username'
              className='input-field'
            />
          </label>
        </div>
        <br></br>
        <br></br>
        <div className='form-input'>
          <label>
            Enter your email:
            <input
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email'
              className='input-field'
            />
          </label>
        </div>
        <br></br>
        <br></br>
        <div className='form-input'>
          <label>
            Choose your password:
            <input
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password 🤫'
              className='input-field'
            />
          </label>
        </div>

        <br></br>
        <br></br>
        <div className='center-align'>
          <button type='submit'>Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
