import { useState, useEffect } from "react";
import "./LeaveReport.css"; // Import CSS file
import axios from "axios"; // Import axios for making HTTP requests

const LeaveReport = ({ role, id }) => {
  const [leaves, setLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

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

  // Filter leaves based on search query
  const filteredLeaves = leaves.filter((leave) =>
    leave.employee.user.fullname
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleApprove = async (leaveId, leaveStartDate) => {
    if (new Date(leaveStartDate) < new Date()) {
      alert("Cannot approve leave. Leave starting date has already passed.");
      return;
    }

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

  const handleReject = async (leaveId, leaveStartDate) => {
    if (new Date(leaveStartDate) < new Date()) {
      alert("Cannot reject leave. Leave starting date has already passed.");
      return;
    }

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
      {/* Search box */}
      <input
        type="text"
        placeholder="Search by employee name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "300px", marginBottom: "8px" }}
      />
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
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.map((leave, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{leave.employee.employeeId}</td>
              <td>{leave.employee.user.fullname}</td>
              <td>{leave.leaveStartDate}</td>
              <td>{leave.leaveEndDate}</td>
              <td>{leave.leaveReason}</td>
              <td>{leave.status}</td>

              <td>
                <button
                  className="approve-button"
                  onClick={() =>
                    handleApprove(leave.leaveId, leave.leaveStartDate)
                  }
                  disabled={new Date(leave.leaveStartDate) < new Date()}
                >
                  Approve
                </button>
              </td>
              <td>
                <button
                  className="reject-button"
                  onClick={() =>
                    handleReject(leave.leaveId, leave.leaveStartDate)
                  }
                  disabled={new Date(leave.leaveStartDate) < new Date()}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveReport;
