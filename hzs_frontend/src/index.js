import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Header from './header/Header';
import Login from './login/login';

import reportWebVitals from './reportWebVitals';
import MapPage from './mapping/MapPage';


ReactDOM.render(
  <React.StrictMode>
    <Header></Header>
    <MapPage></MapPage>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
