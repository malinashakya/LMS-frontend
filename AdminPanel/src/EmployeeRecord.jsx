import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext"; // Adjust the path as necessary

const EmployeeRecord = () => {
  const { id: userId } = useContext(UserContext); // Accessing id from UserContext

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(
          `http://localhost:8084/employees/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch employee");
        }
        const data = await response.json();
        setEmployee(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError("Error fetching data: " + error.message);
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchEmployee();
  }, [userId]);

  const handleEdit = () => {
    if (employee && employee.user && employee.user.id) {
      // Redirect to the edit page for the employee
      window.location.href = `/editemployee/${employee.user.id}`;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!employee) {
    return <p>No employee found</p>;
  }

  return (
    <div className="employee-container">
      <h2>Employee Details</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fullname</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Contact</th>
            <th>Department</th>
            <th>Leave Left</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr key={employee.user ? employee.user.id : employee.employee_id}>
            <td>{employee.user ? employee.user.id || "Unknown" : "Unknown"}</td>
            <td>
              {employee.user ? employee.user.fullname || "Unknown" : "Unknown"}
            </td>
            <td>{employee.address}</td>
            <td>{employee.dateOfBirth}</td>
            <td>{employee.contact}</td>
            <td>{employee.department.department_name || "Unknown"}</td>
            <td>{employee.leaveLeft}</td>
            <td>
              <button
                style={{ backgroundColor: "yellow", color: "black" }} // Adjust color as needed
                className="edit-button"
                onClick={handleEdit}
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeRecord;
