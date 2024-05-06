import {
  BsGrid1X2Fill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

function SideBar2({ openSidebarToggle, OpenSidebar }) {
  // Handle logout functionality
  const handleLogout = () => {
    // Perform logout logic here, such as clearing authentication tokens, etc.
    // Then redirect to the login page
    window.location.href = "http://localhost:8084/login";
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <Link to="/" onClick={openSidebarToggle}>
              <BsGrid1X2Fill className="icon" /> Dashboard
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="/employee-record" onClick={openSidebarToggle}>
              <BsPeopleFill className="icon" /> Detail
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="/leave-request" onClick={openSidebarToggle}>
              <BsListCheck className="icon" /> Leave Request
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="/leave-reports" onClick={openSidebarToggle}>
              <BsMenuButtonWideFill className="icon" /> Leave Reports
            </Link>
          </li>
          <li className="sidebar-list-item">
            {/* Use onClick to handle logout */}
            <Link to="#" onClick={handleLogout}>
              <BsFillGearFill className="icon" /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar2;
