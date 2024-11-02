import '../HomeScreen.css';
import '../Login/form.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoom = () => {
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const returnSelectionPage = () => {
        navigate('/Rooms/RoomSelection');
    };

    return (
        <div>
            <div className='right-align'>
                <button onClick={returnSelectionPage}> ➢{/*🠮 */}</button>
            </div>
            <div className='wrapper'>
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
