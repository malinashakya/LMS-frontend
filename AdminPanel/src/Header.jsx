import { useState } from "react";
import {
  BsFillBellFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

function Header({ OpenSidebar }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    // Perform logout logic here, such as clearing authentication tokens, etc.
    // Then redirect to the login page
    window.location.href = "http://localhost:8084/login";
  };

  return (
    <header className="header">
      <div className="logo-container">
        <h1 className="logo">HRMS</h1>
      </div>
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <BsSearch className="search-icon" style={{ color: "grey" }} />
        </div>
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <div className="dropdown-container">
          <BsPersonCircle
            className="icon"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="dropdown">
              <ul>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
