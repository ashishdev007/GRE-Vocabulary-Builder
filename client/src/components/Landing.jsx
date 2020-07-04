import React from 'react';
import Words from '../assets/words.png';
import Love from '../assets/love.jpg';
import { Link } from 'react-router-dom';
import '../css/Landing.css';

const Landing = () => {
  return (
    <div id="LandingContainer">
      <img src={Words} id="wordImage" alt="" />
      <p id="LandingMsg">Build your vocabulary today!</p>
      <Link to="/practice">
        <div className="ui button primary">Get Started</div>
      </Link>
      <p id="Salute">
        Built with{' '}
        <span>
          <img src={Love} id="LoveImg" />
        </span>{' '}
        by Ashish & Shrill
      </p>
    </div>
  );
};

export default Landing;
