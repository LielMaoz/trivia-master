import '../HomeScreen.css';
import '../Login/form.css';
import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { LoginContext } from '../../context/Context';

const WaitingRoom = () => {
    const { userLoggedIn } = useContext(LoginContext);
    const { username } = userLoggedIn || {};
    const [socket, setSocket] = useState(null);
    const { state } = useLocation();
    const roomCode = state.roomCode;
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    // Initialize socket only once
    useEffect(() => {
        const newSocket = io.connect('http://localhost:5000');

        // Listen for the 'connect' event to ensure the connection is established
        newSocket.on('connect', () => {
            console.log(`Socket connected: ${newSocket.id}`);
            setSocket(newSocket);
        });

        return () => {
            console.log(`Socket disconnected: ${newSocket.id}`);
            newSocket.disconnect();
        };
    }, []); // Run only once

    // Join room after socket is initialized
    useEffect(() => {
        if (!socket || !roomCode) return;

        console.log('Joining room:', roomCode);
        socket.emit('join_room', roomCode);

        const handleChatMessage = (data) => {
            console.log('Received message:', data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        socket.on('chat_message', handleChatMessage);

        return () => {
            socket.off('chat_message', handleChatMessage);
        };
    }, [socket, roomCode]);

    const sendMessage = () => {
        if (!socket) {
            console.log('Socket not initialized');
            return;
        }

        if (!username) {
            console.error('Username is not set');
            return;
        }

        const messageData = {
            roomId: roomCode,
            username,
            message: inputMessage,
        };

        console.log('Sending message:', messageData);
        socket.emit('chat_message', messageData);

        setInputMessage('');
    };

    return (
        <div>
            <h1>Waiting Room ☕</h1>
            <h2>Room Number: {roomCode}</h2>

            <div className='chat-box'>
                {messages.length === 0 ? (
                    <p>No messages yet. Start the conversation!</p>
                ) : (
                    messages.map((msg, index) => (
                        <p key={index}>
                            <strong>{msg.username}:</strong> {msg.message}
                        </p>
                    ))
                )}
            </div>

            <div className='chat-input'>
                <input
                    type='text'
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder='Type a message...'
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default WaitingRoom;
