import "./header.css";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <header>
        <h1 className="brand">TripZen</h1>

        <h3></h3>

        <Link to="/login" className="login">
          <h3 className="login">Log In</h3>
        </Link>
      </header>
    </div>
  );
}
