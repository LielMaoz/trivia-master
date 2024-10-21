import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import './Login/form.css';
import './HomeScreen.css';
import Bar from './Bar/Bar';

const HomeScreen = () => {
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
        navigate(`/Custom`);
    };

    const handleQuickMouseDown = () => {
        quickGameSetImageSrc('./images/quickClicked.png');
    };

    const handleQuickClick = () => {
        navigate(
            `/Question/Question?numQuestions=${10}&category=${9}&difficulty=${'medium'}`
        );
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
            {/*<Bar />*/}
            <div classNAme='home-align'>
                <img className='img-message' src='./images/welcome.png' />
                <img className='img-message' src='./images/chooseMessage.png' />

                {/*<h1>Welcome to the Trivia Game!</h1>*/}
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
