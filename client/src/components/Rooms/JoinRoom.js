import '../HomeScreen.css';
import '../Login/form.css';
import React, { useState } from 'react';

const JoinRoom = () => {
    const [roomCode, setRoomCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className='wrapper'>
            <div className='buttons-align'>
                <form onSubmit={handleSubmit}>
                    <div className='input-field'>
                        <input
                            id='code'
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                            placeholder=' '
                        />
                        <label>Enter the room code:</label>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className='center-align'>
                        <button type='submit'>Join</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinRoom;
