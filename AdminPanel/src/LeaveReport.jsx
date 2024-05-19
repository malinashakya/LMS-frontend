import { useState, useEffect } from "react";
import "./LeaveReport.css"; // Import CSS file
import axios from "axios"; // Import axios for making HTTP requests

const LeaveReport = ({ role, id }) => {
  const [leaves, setLeaves] = useState([]);

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

  const handleApprove = async (leaveId) => {
    try {
      // Fetch existing leave data from the backend
      const response = await axios.get(
        `http://localhost:8084/leaves/${leaveId}`
      );
      const existingLeaveData = response.data;

      // Update the leave status to "Accepted" in the backend
      await axios.put(`http://localhost:8084/leaves/${leaveId}`, {
        ...existingLeaveData, // Include existing leave data
        status: "Accepted",
      });

      // Fetch updated leave data from the backend
      await fetchLeaves();

      alert("Leave has been approved");
    } catch (error) {
      console.error("Error approving leave:", error);
    }
  };

  const handleReject = async (leaveId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to reject the leave?"
    );
    if (isConfirmed) {
      try {
        // Fetch existing leave data from the backend
        const response = await axios.get(
          `http://localhost:8084/leaves/${leaveId}`
        );
        const existingLeaveData = response.data;

        // Update the leave status to "Rejected" in the backend
        await axios.put(`http://localhost:8084/leaves/${leaveId}`, {
          ...existingLeaveData, // Include existing leave data
          status: "Rejected",
        });

        // Fetch updated leave data from the backend
        await fetchLeaves();

        alert("Leave has been rejected");
      } catch (error) {
        console.error("Error rejecting leave:", error);
      }
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
                    <button
                      className="approve-button"
                      onClick={() => handleApprove(leave.leaveId)}
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      className="reject-button"
                      onClick={() => handleReject(leave.leaveId)}
                    >
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
