import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Question from './components/Question/Question';
import Login from './components/Login/Login';
import Custom from './components/Custom';
import Bar from './components/Bar/Bar';
import Signup from './components/Signup';
import './App.css';

import { GameContext, LoginContext } from './context/Context';

const App = () => {
  const [gameOptions, setGameOptions] = useState({
    numOfQuestions: 10,
    category: '9',
    difficulty: 'medium',
  });

  const [userLoggedIn, setUserLoggedIn] = useState();

  return (
    <LoginContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      <GameContext.Provider value={{ gameOptions, setGameOptions }}>
        <BrowserRouter>
          <div id='background-div'>
            <div className='content-container'>
              <Bar />
              {/*<img
                        src='/images/triviaMasterHeader3.png'
                        width='87%'
                        height='34%'
                        alt='trivia master'
                    />*/}
              <Routes>
                <Route path='/' element={<HomeScreen />} />
                {/*<Route path='/HomeScreen' element={<HomeScreen />} /> */}
                <Route path='/Login/Login' element={<Login />} />
                <Route path='/Signup' element={<Signup />} />
                <Route path='/Question/Question' element={<Question />} />
                <Route path='/Custom' element={<Custom />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </GameContext.Provider>
    </LoginContext.Provider>
  );
};

export default App;
