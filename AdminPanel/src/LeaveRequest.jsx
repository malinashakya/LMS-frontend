import { useState, useContext } from "react";
import "./LeaveRequest.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const LeaveRequest = () => {
  const { id: employeeId } = useContext(UserContext);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [leaveType, setLeaveType] = useState("Casual");
  const [leaveReason, setLeaveReason] = useState("");
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();

  const handleApplyLeave = async (e) => {
    e.preventDefault();

    if (new Date(endDate) < new Date(startDate)) {
      setWarning(
        "Leave end date must be equal or greater than leave start date."
      );
      return;
    }

    if (leaveReason.trim() === "") {
      setWarning("Leave reason is required.");
      return;
    }

    try {
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
      setWarning(""); // Clear warning message on successful application

      console.log("Leave applied successfully!");
      navigate("/my-leave-reports");
    } catch (error) {
      console.error("Error applying leave:", error);
      setWarning("Error applying leave. Please try again.");
    }
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="leave-request-form">
      <h2>Leave Request</h2>
      <form onSubmit={handleApplyLeave}>
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
              min={today}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              min={today}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Leave Reason:</label>
          <textarea
            value={leaveReason}
            onChange={(e) => setLeaveReason(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button className="apply-leave-button" type="submit">
            Apply Leave
          </button>
        </div>
        {warning && <p className="warning-message">{warning}</p>}
      </form>
    </div>
  );
};

export default LeaveRequest;
