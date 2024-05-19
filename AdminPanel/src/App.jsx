import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Department from "./Department";
import Employee from "./Employee";
import LeaveRequest from "./LeaveRequest";
import LeaveReport from "./LeaveReport";
import Logout from "./Logout";
import AddDetails from "./AddDetails";
import AddDepartment from "./AddDepartment";
import ViewDepartment from "./ViewDepartment";
import EditDepartment from "./EditDepartment";
import EditEmployee from "./EditEmployee";
import SideBar2 from "./SideBar2";
import EmployeeRecord from "./assets/EmployeeRecord";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [role, setRole] = useState("");
  const [id, setId] = useState(""); // Add state for ID

  useEffect(() => {
    // Fetch role from URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get("role");
    const fullnameParam = urlParams.get("fullname");
    const idParam = urlParams.get("id"); // Use idParam to avoid naming conflict
    console.log("Fullname:", fullnameParam);
    console.log("ID:", idParam);

    setRole(roleParam);
    setId(idParam); // Set ID state
    console.log("Role:", roleParam);
    axios.defaults.headers.common["Role"] = roleParam; // Example with role
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        {role === "admin" ? (
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
        ) : (
          <SideBar2
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/department" element={<Department />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/leave-request" element={<LeaveRequest />} />
          <Route
            path="/leave-reports"
            element={<LeaveReport role={role} id={id} />}
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/adddetails" element={<AddDetails />} />
          <Route path="/adddepartment" element={<AddDepartment />} />
          <Route path="/employee-record" element={<EmployeeRecord />} />
          <Route
            path="/viewdepartment/:department_code"
            element={<ViewDepartment />}
          />
          <Route
            path="/editdepartment/:department_code"
            element={<EditDepartment />}
          />
          <Route
            path="/editemployee/:id"
            element={<EditEmployee role={role} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
