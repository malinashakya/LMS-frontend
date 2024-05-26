import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
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
import EmployeeRecord from "./EmployeeRecord";
import { UserContext } from "./UserContext";
import MyLeaveReport from "./MyLeaveReport";

function App() {
  const { role, id } = useContext(UserContext);
  const [openSidebarToggle, setOpenSidebarToggle] = React.useState(false);

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
          <Route path="/my-leave-reports" element={<MyLeaveReport />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/adddetails" element={<AddDetails />} />
          <Route path="/adddepartment" element={<AddDepartment />} />
          <Route path="/employee-record/:id" element={<EmployeeRecord />} />
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
