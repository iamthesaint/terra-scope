import "./header.css";

import { Link } from "react-router-dom";
import Profile from "../profile/profile.js";
import Auth from "../../utils/auth";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
          <div
            className="profile"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <Profile />

            <div
              className="offcanvas offcanvas-end"
              tabIndex={-1}
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h2 id="offcanvasRightLabel">Hello, User</h2>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
              <Link to="/home">
                  <h3 className="options">Home</h3>
                </Link>
              <Link to="/profile">
                  <h3 className="options">My Profile</h3>
                </Link>
                <Link to="/settings">
                  <h3 className="options">Settings</h3>
                </Link>
                <h3
                  className="logout"
                  onClick={() => {
                    Auth.logout();
                  }}
                >
                  Log Out
                </h3>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
