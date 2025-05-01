import React from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css';
import userIcon from '../assets/user.png';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <h1 className="navbar-logo">ThinkFast</h1>
        <div className="navbar-buttons">
          <Link to="/user" className="user-button"> 
            <img src={userIcon} alt="User Icon" className="user-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
