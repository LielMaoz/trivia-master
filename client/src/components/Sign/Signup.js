import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/form.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isSigned, setSigned] = useState(false);
    const navigate = useNavigate();

    if (isSigned) {
        {
            /* set something to true */
        }
        navigate(`/`);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        //change to something else to check if they are valid
        if (password === password2) {
            if (name && password && email) {
                setSigned(true); // Set signup state to true
            } else {
                alert('Please fill all the boxes');
            }
        } else {
            alert('There is a missmatch between your passwords...');
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                <div className='form-input'>
                    <label>
                        Repeat your password:
                        <input
                            id='password2'
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            placeholder='again...'
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
