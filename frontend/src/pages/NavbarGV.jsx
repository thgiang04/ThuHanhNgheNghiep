import React from "react";
import { Link } from "react-router-dom";
import "./NavbarGV.css";
import userIcon from "../assets/userGV.png"; // Import icon user

const NavbarGV = () => {
  return (
    <div className="navbarGV-container">
      <div className="navbarGV-content">
        <h1 className="navbarGV-logo">ThinkFast</h1>
        <div className="navbarGV-buttons">
          <Link to="/userGV" className="userGV-button">
            <img src={userIcon} alt="User Icon" className="userGV-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarGV;
