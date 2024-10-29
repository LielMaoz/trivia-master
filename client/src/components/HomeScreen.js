import React, { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import './Login/form.css';
import './HomeScreen.css';
import Bar from './Bar/Bar';

import { GameContext, LoginContext } from '../context/Context';

const HomeScreen = () => {
  const { setGameOptions } = useContext(GameContext);
  const { userLoggedIn } = useContext(LoginContext);

  const navigate = useNavigate();

  const [customGameImageSrc, customGameSetImageSrc] = useState(
    './images/custom.png'
  );
  const [quickGameImageSrc, quickGameSetImageSrc] =
    useState('./images/quick.png');
  const [privateGameImageSrc, privateGameSetImageSrc] = useState(
    './images/private.png'
  );

  const handleCustomMouseDown = () => {
    customGameSetImageSrc('./images/customClicked.png');
  };

  const handleCustomClick = () => {
    /***check if the user is connected*/
    setGameOptions({
      numOfQuestions: 10,
      category: '9',
      difficulty: 'medium',
    });
    navigate(`/Custom`);
  };

  const handleQuickMouseDown = () => {
    console.log(userLoggedIn);
    quickGameSetImageSrc('./images/quickClicked.png');
  };

  const handleQuickClick = () => {
    setGameOptions({
      numOfQuestions: 10,
      category: '9',
      difficulty: 'medium',
    });
    navigate('/Question/Question');
  };

  const handlePrivateMouseDown = () => {
    privateGameSetImageSrc('./images/privateClicked.png');
  };

  const handlePrivateClick = () => {
    /***check if the user is connected*/
    // navigate...
  };

  return (
    <div>
      <div className='home-align'>
        {userLoggedIn && (
          <div>
            {' '}
            <span id='img-message'> Hi {userLoggedIn.username} 👋</span>
          </div>
        )}

        <img className='img-message' src='./images/welcome.png' />
        <img className='img-message' src='./images/chooseMessage.png' />

        <div className='buttons-align'>
          <img
            className='image-button'
            src={customGameImageSrc}
            onMouseDown={handleCustomMouseDown}
            onClick={handleCustomClick}
          />
          <img
            className='image-button'
            src={quickGameImageSrc}
            onMouseDown={handleQuickMouseDown}
            onClick={handleQuickClick}
          />
          <img
            className='image-button'
            src={privateGameImageSrc}
            onMouseDown={handlePrivateMouseDown}
            onClick={handlePrivateClick}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
