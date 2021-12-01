import React, { Profiler } from 'react';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import './App.css';
import ReviewList from "./components/ReviewList.js";
import Reviews from './components/Reviews';
import Header from './header/Header';
import Login from './login/login';
import MapPage from './mapping/MapPage';

import Profil from './profil_stranica/Profil_stranica'
import About from './about_stranica/About'

const App = () => {
    return(
        <React.Fragment>
            <Header></Header>
            <BrowserRouter>
                <Routes>
                    <Route path="/profil" element={<Profil/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/mape" element={<MapPage/>}/>
                    <Route path="/list" element={<ReviewList/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
