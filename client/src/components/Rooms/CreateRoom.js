import '../HomeScreen.css';
import '../Login/form.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginContext } from '../../context/Context';
import axios from 'axios';

const CreateRoom = () => {
    const { userLoggedIn } = useContext(LoginContext);
    const [roomName, setGroupName] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(''); // Add state for error message
    let roomCode;
    const handleSubmit = async (e) => {
        e.preventDefault();
        createRoom();
    };

    const createRoom = async () => {
        try {
            /*console.log('userLoggedIn in component:', userLoggedIn);*/

            /*console.log('1 ' + userLoggedIn.username);*/

            const requestBody = {
                roomName,
                creatorName: userLoggedIn.username,
            };

            /*console.log('Request Body:', requestBody);*/ // Log the body being sent to the server

            const response = await axios.post(
                'http://localhost:5000/api/room/create',
                requestBody,
                /*{
                    roomName,
                    creatorName: userLoggedIn.username,
                }*/ {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.success) {
                alert(response.data.message); // Success message: "Room created successfully!"
                // Redirect to the new room or display room info
                console.log('New Room ID:', response.data.roomId);
                roomCode = response.data.roomId;
                addPlayerToRoom();
                navigate('/Rooms/WaitingRoom', {
                    state: { roomCode },
                });
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message); // Set error message to display
            } else {
                console.error('Error creating room:', error);
                setErrorMessage('An unexpected error occurred.');
            }
        }
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
                            id='group-name'
                            value={roomName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder=' '
                        />
                        <label>Enter your room's name:</label>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className='center-align'>
                        <button type='submit'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRoom;
