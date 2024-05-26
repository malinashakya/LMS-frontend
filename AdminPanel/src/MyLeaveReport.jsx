import React, { useState, useEffect, useContext } from "react";
import "./LeaveReport.css"; // Import CSS file
import { UserContext } from "./UserContext"; // Import UserContext

const MyLeaveReport = () => {
  const [leaves, setLeaves] = useState([]);
  const { id } = useContext(UserContext);

  useEffect(() => {
    fetchLeaves(); // Fetch leaves data when the component mounts
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const fetchLeaves = async () => {
    try {
      const response = await fetch("http://localhost:8084/leaves");
      const data = await response.json();
      setLeaves(data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  return (
    <div className="leave-report">
      <h2>Leave Report</h2>
      <table className="leave-table">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Starting Date</th>
            <th>Ending Date</th>
            <th>Reason for Leave</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(
            (leave, index) =>
              // Render rows only if id matches employee ID
              id == leave.employee.employeeId && (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{leave.employee.employeeId}</td>
                  <td>{leave.employee.user.fullname}</td>
                  <td>{leave.leaveStartDate}</td>
                  <td>{leave.leaveEndDate}</td>
                  <td>{leave.leaveReason}</td>
                  <td>{leave.status}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyLeaveReport;
