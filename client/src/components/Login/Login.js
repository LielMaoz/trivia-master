import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';
import axios from 'axios';
import { LoginContext } from '../../context/Context';

const Login = () => {
  const { userLoggedIn, setUserLoggedIn } = useContext(LoginContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //change to something else to check if they are valid
    if (!email || !password) {
      alert('Please enter both email and password.');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/login', {
          email,
          password,
        });
        if (response.data.success) {
          alert('User logged in successfully!');
          setUserLoggedIn(email);
          console.log(userLoggedIn);
          navigate(`/`);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        if (error.response.status == 401) {
          console.error('Error registering user:', error.response.data.message);
          alert('Invalid email or password');
        } else {
          console.error('Error registering user:', error);
          alert('An error occurred during login.');
        }
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      <form className='form-align' onSubmit={handleSubmit}>
        <div className='form-input'>
          <label>
            Enter your email:
            {/*<br></br>*/}
            <input
              id='userEmail'
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
            Enter your password:
            {/*<br></br>*/}
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
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
