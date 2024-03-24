import "./LeaveReport.css"; // Import CSS file

const LeaveReport = () => {
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
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data */}
          <tr>
            <td>1</td>
            <td>EMP001</td>
            <td>John Doe</td>
            <td>2024-04-01</td>
            <td>2024-04-05</td>
            <td>Vacation</td>
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
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveReport;
