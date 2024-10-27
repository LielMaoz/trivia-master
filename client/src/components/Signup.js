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
                    console.error(
                        'Error registering user:',
                        error.response.data.message
                    );
                    alert(error.response.data.message);
                } else {
                    console.error('Error registering user:', error);
                    alert('An error occurred during registration.');
                }
            }
        }
    };

    return (
        <div className='wrapper'>
            <h1>Sign up Page</h1>

            <form onSubmit={handleSubmit}>
                <div className='input-field'>
                    <input
                        id='userName'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder=' '
                        autoComplete='off'
                    />
                    <label>Choose your username:</label>
                </div>

                <div className='input-field'>
                    <input
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=' '
                    />
                    <label>Enter your email: </label>
                </div>

                <div className='input-field'>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=' '
                    />
                    <label>Choose your password: 🤫</label>
                </div>

                <div className='center-align'>
                    <button type='submit'>Sign up</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
