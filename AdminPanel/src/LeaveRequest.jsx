import { useState } from "react";
import "./LeaveRequest.css";

const LeaveRequest = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [leaveType, setLeaveType] = useState("Casual");
  const [leaveReason, setLeaveReason] = useState("");

  const handleApplyLeave = () => {
    // Handle applying leave here (to be implemented)
  };

  return (
    <div className="leave-request-form">
      <h2>Leave Request</h2>
      <div className="form-group">
        <label>Employee ID:</label>
        <input type="text" value="12345" disabled />
      </div>
      <div className="form-group">
        <label>Employee Name:</label>
        <input type="text" value="John Doe" disabled />
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
    </div>
  );
};

export default LeaveRequest;
