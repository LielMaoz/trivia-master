import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Question from './components/Question';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div id='background-div'>
        <div className='content-container'>
          <img
            src='/images/triviaMasterHeader3.png'
            width='87%'
            height='34%'
            alt='trivia master'
          />
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/questions' element={<Question />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
