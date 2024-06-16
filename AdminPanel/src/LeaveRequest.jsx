import { useState, useEffect, useContext } from "react";
import "./LeaveRequest.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const LeaveRequest = () => {
  const { id: employeeId } = useContext(UserContext);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .slice(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .slice(0, 10)
  );
  const [leaveType, setLeaveType] = useState("Casual");
  const [leaveReason, setLeaveReason] = useState("");
  const [warning, setWarning] = useState("");
  const [acceptedSickLeaveDays, setAcceptedSickLeaveDays] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAcceptedSickLeaveDays();
  }, [employeeId]);

  const fetchAcceptedSickLeaveDays = async () => {
    try {
      const response = await axios.get("http://localhost:8084/leaves");
      const leaves = response.data;

      const sickLeaves = leaves.filter(
        (leave) =>
          leave.employee.employeeId == employeeId &&
          leave.leaveType === "Sick" &&
          leave.status === "Accepted"
      );

      const totalDays = sickLeaves.reduce((sum, leave) => {
        const start = new Date(leave.leaveStartDate);
        const end = new Date(leave.leaveEndDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Including the start date
        return sum + diffDays;
      }, 0);

      setAcceptedSickLeaveDays(totalDays);
    } catch (error) {
      console.error("Error fetching accepted sick leave days:", error);
    }
  };

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

    const newLeaveStart = new Date(startDate);
    const newLeaveEnd = new Date(endDate);
    const newLeaveDiffTime = Math.abs(newLeaveEnd - newLeaveStart);
    const newLeaveDays =
      Math.ceil(newLeaveDiffTime / (1000 * 60 * 60 * 24)) + 1; // Including the start date

    if (leaveType === "Sick" && acceptedSickLeaveDays + newLeaveDays > 15) {
      alert(
        `Only 15 sick leave days can be applied in one year, and you have only ${
          15 - acceptedSickLeaveDays
        } sick leave days left.`
      );
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

      const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .slice(0, 10);

      setStartDate(tomorrow);
      setEndDate(tomorrow);
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

  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .slice(0, 10);

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
              min={tomorrow}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              min={tomorrow}
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
      </form>
    </div>
  );
};

export default LeaveRequest;
