import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    if (isLoggedIn) {
        navigate(`/`);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email + ',' + password);
        //change to something else to check if they are valid
        if (email && password) {
            setIsLoggedIn(true); // Set login state to true
        } else {
            alert('Please enter both email and password.');
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
