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
import Registracija from './registration/Registratracija';

/**
 * <Header></Header>
            <BrowserRouter>
                <Routes>
                    <Route path="/profil" element={<Profil/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/mape" element={<MapPage/>}/>
                    <Route path="/list" element={<ReviewList/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
 */

const App = () => {
    return(
        <React.Fragment>
            <div className="container">
            <Header></Header>
            </div>
            <div className="container">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Profil/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/mape" element={<MapPage/>}/>
                        <Route path="/list" element={<Reviews/>}/>
                        <Route path="/login" element={window.sessionStorage.getItem("username") ? <Login/> : <Registracija/>}/>
                        <Route path="/registracija" element={<Registracija/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </React.Fragment>
    );
}

export default App;
