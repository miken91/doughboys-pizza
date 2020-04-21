import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './mystyles.scss';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <ReactNotification/>
    <App/>
  </Router>,
  document.getElementById('root')
);

