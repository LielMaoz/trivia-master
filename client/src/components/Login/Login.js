import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import Question from '../Question';
import './form.css';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    if (isLoggedIn) {
        navigate(`/HomeScreen`);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name + ',' + password);
        //change to something else to check if they are valid
        if (name && password) {
            setIsLoggedIn(true); // Set login state to true
        } else {
            alert('Please enter both username and password.');
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <br></br>
            <br></br>
            <form className='left-align' onSubmit={handleSubmit}>
                <label>
                    Enter your username:&nbsp;&nbsp;
                    <input
                        id='userName'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter username'
                        className='input-field'
                    />
                </label>
                <br></br>
                <br></br>
                <label>
                    Enter your password:&nbsp;&nbsp;
                    <input
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter password 🤫'
                        className='input-field'
                    />
                </label>
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
