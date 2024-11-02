import '../HomeScreen.css';
import '../Login/form.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
    const [groupName, setGroupName] = useState('');
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
                            id='group-name'
                            value={groupName}
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
