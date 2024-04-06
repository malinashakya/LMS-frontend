import { useState } from "react";
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

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/department" element={<Department />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/leave-request" element={<LeaveRequest />} />
          <Route path="/leave-reports" element={<LeaveReport />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/adddetails" element={<AddDetails />} />
          <Route path="/adddepartment" element={<AddDepartment />} />
          <Route
            path="/viewdepartment/:department_code"
            element={<ViewDepartment />}
          />
          <Route
            path="/editdepartment/:department_code"
            element={<EditDepartment />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
