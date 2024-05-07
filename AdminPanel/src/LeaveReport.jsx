import { useState, useEffect } from "react";
import "./LeaveReport.css"; // Import CSS file

const LeaveReport = ({ role }) => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8084/leaves") // Fetch leaves data from the API
      .then((response) => response.json())
      .then((data) => setLeaves(data))
      .catch((error) => console.error("Error fetching leaves:", error));
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const handleApprove = () => {
    alert("Leave has been accepted");
  };

  const handleReject = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to reject the leave?"
    );
    if (isConfirmed) {
      alert("Leave has been rejected");
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
            {role === "admin" && <th colSpan={2}>Action</th>}
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{leave.employee.employeeId}</td>
              <td>{leave.employee.user.fullname}</td>
              <td>{leave.leaveStartDate}</td>
              <td>{leave.leaveEndDate}</td>
              <td>{leave.leaveReason}</td>
              <td>{leave.status}</td>
              {role === "admin" && (
                <>
                  <td>
                    <button className="approve-button" onClick={handleApprove}>
                      Approve
                    </button>
                  </td>
                  <td>
                    <button className="reject-button" onClick={handleReject}>
                      Reject
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveReport;
