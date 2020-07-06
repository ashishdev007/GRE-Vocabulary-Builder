import React from 'react';
import logo from '../assets/brain.svg';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <div class="ui top inverted menu">
        <Link className="item" to="/">
          <img src={logo} />
        </Link>

        <div className="right menu">
          <Link className="item" to="/add-word">
            Add Word
          </Link>
          <Link className="item" to="/practice">
            Practice
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
