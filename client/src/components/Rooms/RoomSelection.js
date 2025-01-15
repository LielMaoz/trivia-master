import '../HomeScreen.css';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const RoomSelection = () => {
    const navigate = useNavigate();

    const [joinRoomSrc, setJoinRoomSrc] = useState('../images/join1.png');
    const [createRoomSrc, setCreateRoomSrc] = useState('../images/new1.png');

    const handleJoinMouseDown = () => {
        setJoinRoomSrc('../images/joinClicked1.png');
    };

    const handleCreateMouseDown = () => {
        setCreateRoomSrc('../images/newClicked1.png');
    };

    const handleJoinClick = () => {
        navigate('/Rooms/JoinRoom');
    };

    const handleCreateClick = () => {
        navigate('/Rooms/CreateRoom');
    };

    return (
        <div className='home-align'>
            <span className='text-message'>Select Room Option: </span>

            <div className='buttons-align'>
                <div className='buttons-align'>
                    {' '}
                    <img
                        className='image-button'
                        src={joinRoomSrc}
                        onMouseDown={handleJoinMouseDown}
                        onClick={handleJoinClick}
                    />
                    <img
                        className='image-button'
                        src={createRoomSrc}
                        onMouseDown={handleCreateMouseDown}
                        onClick={handleCreateClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default RoomSelection;
