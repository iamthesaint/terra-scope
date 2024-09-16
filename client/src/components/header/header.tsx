import './header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div>
<header>
    <div className="header-left">
    <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
    </div>
    <div className="header-center">
        <h1 className="brand">TripZen</h1>
    </div>
    <div className="header-right">
        <h3 className='login'>Log In</h3>
    </div>
</header>
    </div>
  );
}
