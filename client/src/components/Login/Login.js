import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';
import axios from 'axios';
import { LoginContext /*UserNameContext*/ } from '../../context/Context';

const Login = () => {
    const { setUserLoggedIn } = useContext(LoginContext);

    // const { username, setUsername } = useContext(UserNameContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please enter both email and password.');
        } else {
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/login',
                    {
                        email,
                        password,
                    }
                );

                console.log(response.data); // Log the entire response for debugging

                if (response.data.success) {
                    //setUsername(response.data.username);
                    setUserLoggedIn({
                        email: email,
                        username: response.data.username,
                    });
                    //setUsername(response.data.username);
                    //console.log(response.data.username);
                    //console.log(userLoggedIn.username);
                    /*alert('User logged in successfully!');*/
                    navigate(`/`);
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                if (error.response) {
                    // Check if error response is available
                    if (error.response.status === 401) {
                        console.error(
                            'Error during login:',
                            error.response.data.message
                        );
                        alert('Invalid email or password');
                    } else {
                        console.error('Error during login:', error);
                        alert('An error occurred during login.');
                    }
                } else {
                    console.error('Network error:', error);
                    alert('A network error occurred. Please try again.');
                }
            }
        }
    };

    /*autoComplete='off'*/
    return (
        <div className='wrapper'>
            <h1>Login Page</h1>

            <form onSubmit={handleSubmit}>
                <div className='input-field'>
                    <input
                        id='userEmail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=' '
                    />
                    <label>Enter your email:</label>
                </div>

                <div className='input-field'>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=' '
                    />
                    <label>Enter your password:</label>
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
