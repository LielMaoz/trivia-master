import '../HomeScreen.css';
import '../Login/form.css';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { LoginContext } from '../../context/Context';
import axios from 'axios';

const JoinRoom = () => {
    const { userLoggedIn } = useContext(LoginContext);
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userLoggedIn.username);
        console.log(roomCode);
        addPlayerToRoom();
    };

    const addPlayerToRoom = async () => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/room/add-player`,
                {
                    username: userLoggedIn.username,
                    roomId: roomCode,
                }
            );

            if (response.data.success) {
                console.log(response.data.message); // Player added successfully
                navigate('/Rooms/WaitingRoom', { state: { roomCode } });
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.error(error.response.data.message); // Display server error message
                alert(error.response.data.message); // Show message to the user (e.g., "Player is already in the room.")
            } else {
                console.error('An error occurred:', error);
            }
        }
    };

    /*let socket;*/
    /*const socket = io.connect('http://localhost:5000');
    const join = () => {
        if (roomCode !== '') {
            socket.emit('join_room', roomCode);
            navigate('/Rooms/WaitingRoom', { state: { roomCode } });
        }
    };
    useEffect(() => {
        //socket = io('http://localhost:5000');

        return () => {
            socket.disconnect(); // Clean up the socket connection on component unmount
        };
    }, []);*/

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
                            autoComplete='off'
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
