import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './mystyles.scss';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <ScrollToTop/>
    <ReactNotification/>
    <App/>
  </Router>,
  document.getElementById('root')
);

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

