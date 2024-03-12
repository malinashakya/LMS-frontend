import {
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  return (
    <aside id="sidebar" className={isSidebarOpen ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <Link to="/" onClick={toggleSidebar}>
              <BsGrid1X2Fill className="icon" /> Dashboard
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="/department" onClick={toggleSidebar}>
              <BsFillGrid3X3GapFill className="icon" /> Department
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="/employees" onClick={toggleSidebar}>
              <BsPeopleFill className="icon" /> Employees
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="/leave-request" onClick={toggleSidebar}>
              <BsListCheck className="icon" /> Leave Request
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="/leave-reports" onClick={toggleSidebar}>
              <BsMenuButtonWideFill className="icon" /> Leave Reports
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="/logout" onClick={toggleSidebar}>
              <BsFillGearFill className="icon" /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
