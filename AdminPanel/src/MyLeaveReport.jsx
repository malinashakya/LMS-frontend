import { useState, useEffect, useContext } from "react";
import "./MyLeaveReport.css"; // Import CSS file
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

  const calculateLeaveDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Including the start date
    return diffDays;
  };

  const casualLeaves = leaves.filter(
    (leave) => leave.employee.employeeId == id && leave.leaveType === "Casual"
  );

  const sickLeaves = leaves.filter(
    (leave) => leave.employee.employeeId == id && leave.leaveType === "Sick"
  );

  const acceptedCasualLeaveDays = casualLeaves
    .filter((leave) => leave.status === "Accepted")
    .reduce(
      (total, leave) =>
        total + calculateLeaveDays(leave.leaveStartDate, leave.leaveEndDate),
      0
    );

  const acceptedSickLeaveDays = sickLeaves
    .filter((leave) => leave.status === "Accepted")
    .reduce(
      (total, leave) =>
        total + calculateLeaveDays(leave.leaveStartDate, leave.leaveEndDate),
      0
    );

  return (
    <div className="leave-report">
      <h2>My Leave Report</h2>
      <div className="leave-counts">
        <p>
          Accepted Casual Leave Days: <b>{acceptedCasualLeaveDays}</b>, Accepted
          Sick Leave Days: <b>{acceptedSickLeaveDays}</b>, Number of remaining
          Sick Leave Days in a year:
          <b>{15 - acceptedSickLeaveDays}</b>
        </p>
      </div>
      <table className="leave-table">
        <thead>
          <tr>
            <th>Leave ID</th>
            <th>Starting Date</th>
            <th>Ending Date</th>
            <th>Number of Days</th> {/* New column for number of leave days */}
            <th>Leave Type</th> {/* New column for leave type */}
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
                  <td>{leave.leaveId}</td>
                  <td>{leave.leaveStartDate}</td>
                  <td>{leave.leaveEndDate}</td>
                  <td>
                    {calculateLeaveDays(
                      leave.leaveStartDate,
                      leave.leaveEndDate
                    )}
                  </td>{" "}
                  {/* Calculate and display number of leave days */}
                  <td>{leave.leaveType}</td> {/* Display leave type */}
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
