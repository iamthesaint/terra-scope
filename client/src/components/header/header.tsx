import "./header.css";

import { Link } from "react-router-dom";
import Profile from "../profile/profile";
import Auth from "../../utils/Auth";
import { useState, useEffect } from "react";

export default function Header() {

  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (Auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginCheck]);

  return (
    <div>
      <header>
        <h1 className="brand">TripZen</h1>

        {!loginCheck ? (

        <Link to="/login" className="login">
        <h3 className="login">Log In</h3>
      </Link>
        ) : (
          <div className="profile">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle profile" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <Profile />
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">View Profile</a>
              <a className="dropdown-item" href="#">Settings</a>
              <a className="dropdown-item" href="#">Log Out</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
          </div>

        )}


      </header>
    </div>
  );
}
