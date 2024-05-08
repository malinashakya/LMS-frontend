import { useState } from "react";
import "./LeaveRequest.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LeaveRequest = () => {
  const employeeId = 1;
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [leaveType, setLeaveType] = useState("Casual");
  const [leaveReason, setLeaveReason] = useState("");
  const [warning, setWarning] = useState(""); // State to manage warning message
  const navigate = useNavigate();

  const handleApplyLeave = async () => {
    try {
      if (new Date(endDate) <= new Date(startDate)) {
        setWarning("Leave end date must be greater than leave start date."); // Set warning message
        return;
      }

      const newLeave = {
        employee: {
          employeeId: employeeId,
        },
        leaveType: leaveType,
        leaveStartDate: startDate,
        leaveEndDate: endDate,
        leaveReason: leaveReason,
        status: "Pending",
      };

      await axios.post("http://localhost:8084/leave", newLeave);

      setStartDate(new Date().toISOString().slice(0, 10));
      setEndDate(new Date().toISOString().slice(0, 10));
      setLeaveType("Casual");
      setLeaveReason("");

      console.log("Leave applied successfully!");
      navigate("/leave-reports"); // Navigate to leave reports page after successful leave application
    } catch (error) {
      console.error("Error applying leave:", error);
    }
  };

  return (
    <div className="leave-request-form">
      <h2>Leave Request</h2>
      <div className="form-group">
        <label>Employee ID:</label>
        <input type="text" value={employeeId} disabled />
      </div>
      <div className="form-group">
        <label>Leave Type:</label>
        <select
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        >
          <option value="Casual">Casual</option>
          <option value="Sick">Sick</option>
        </select>
      </div>
      <div className="form-group">
        <label>Leave Period:</label>
        <div className="date-range">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Leave Reason:</label>
        <textarea
          value={leaveReason}
          onChange={(e) => setLeaveReason(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button className="apply-leave-button" onClick={handleApplyLeave}>
          Apply Leave
        </button>
      </div>
      {warning && <p className="warning-message">{warning}</p>}{" "}
      {/* Display warning message */}
    </div>
  );
};

export default LeaveRequest;
