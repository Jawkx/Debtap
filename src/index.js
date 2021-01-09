import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainPage from './components/MainPage';
import AddVictims from './components/AddVictims';
import Victims from './components/Victims';


ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={MainPage}/>
      <Route path='/AddVictims' component={AddVictims}/>
      <Route path='/Victims/:id' component={Victims}/>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
