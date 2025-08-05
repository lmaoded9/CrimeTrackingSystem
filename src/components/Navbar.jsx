import React from "react";
import "./Navbar.css";
import logo_light from "../assets/logo-black.png";
import logo_dark from "../assets/logo-white.png";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";

const Navbar = ({ theme, setTheme }) => {

    const navlinks=[
        {path:'/',label:'Home'},
        {path:'/map',label:'Crime Map'},
        {path:'/cases',label:'cases'},
        {path:'/statistics',label:'Statistics'},
        {path:'/pending-cases',label:'Pending Cases'}
    ]
  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div>
      <div className="navbar">
        <img
          src={theme === "light" ? logo_light : logo_dark}
          alt="logo"
          className="logo"
        />
        <ul>
          <li>Home</li>
          <li>Products</li>
          <li>Features</li>
          <li>About</li>
        </ul>
        <img
          onClick={toggle_mode}
          src={theme === "light" ? toggle_light : toggle_dark}
          alt="toggle icon"
          className="toggle-icon"
        />
      </div>
    </div>
  );
};

export default Navbar;
