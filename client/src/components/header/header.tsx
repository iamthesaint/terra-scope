import './header.css'

import { Link } from "react-router-dom";

export default function Header() {

  // const currentPage = useLocation().pathname; if we want to style the login being selected
  return (
    <div>
<header>
    <div className="header-left">
    </div>
    <div className="header-center">
        <h1 className="brand">TripZen</h1>
    </div>
    <div className="header-right">
        <Link to='/login' className='login'><h3 className='login'>Log In</h3></Link>
    </div>
</header>
    </div>
  );
}
