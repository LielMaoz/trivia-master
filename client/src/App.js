import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Question from './components/Question/Question';
import Login from './components/Login/Login';
import Custom from './components/Custom';
import Bar from './components/Bar/Bar';
import Signup from './components/Sign/Signup';
import './App.css';

const App = () => {
    return (
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
                        <Route path='/Sign/Signup' element={<Signup />} />
                        <Route
                            path='/Question/Question'
                            element={<Question />}
                        />
                        <Route path='/Custom' element={<Custom />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
