import { useState, useEffect } from "react";
import "./Employee.css";
import { Link, useParams } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee_id } = useParams();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8084/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();

        // No need to fetch department data

        const modifiedData = data.map((employee) => ({
          ...employee,
          leaveLeft: 5, // Assuming leaveLeft is a default value
        }));

        setEmployees(modifiedData);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError("Error fetching data: " + error.message);
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (employee_id) => {
    try {
      if (window.confirm("Are you sure you want to delete this employee?")) {
        await fetch(`http://localhost:8084/employees/${employee_id}`, {
          method: "DELETE",
        });
        // Filter out the deleted employee from the employees array
        setEmployees(
          employees.filter((employee) => employee.employee_id !== employee_id)
        );
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="employee-container">
      <h2>Employees</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
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
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.user ? employee.user.id : employee.employee_id}>
                <td>
                  {employee.user ? employee.user.id || "Unknown" : "Unknown"}
                </td>
                <td>
                  {employee.user
                    ? employee.user.fullname || "Unknown"
                    : "Unknown"}
                </td>

                <td>{employee.address}</td>
                <td>{employee.dateOfBirth}</td>
                <td>{employee.contact}</td>
                <td>{employee.department.department_name || "Unknown"}</td>
                <td>{employee.leaveLeft}</td>
                <td>
                  <Link
                    className="update-button"
                    to={`/editemployee/${employee.user.id}`}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(employee.user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Employee;
