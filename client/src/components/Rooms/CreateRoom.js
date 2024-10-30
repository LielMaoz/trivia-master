import '../HomeScreen.css';
import '../Login/form.css';
import React, { useState } from 'react';

const CreateRoom = () => {
    const [groupName, setGroupName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className='wrapper'>
            <div className='buttons-align'>
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
