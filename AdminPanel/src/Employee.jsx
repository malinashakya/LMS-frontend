import { useState, useEffect } from "react";
import "./Employee.css";
import { Link, useParams } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8084/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();

        const departmentResponse = await fetch(
          "http://localhost:8084/departments"
        );
        if (!departmentResponse.ok) {
          throw new Error("Failed to fetch departments");
        }
        const departmentData = await departmentResponse.json();

        const departmentMap = {};
        departmentData.forEach((department) => {
          departmentMap[department.department_code] = department;
        });

        const modifiedData = data.map((employee) => ({
          ...employee,
          leaveLeft: 5,
          department: departmentMap[employee.department_code],
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

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this employee?")) {
        await fetch(`http://localhost:8084/employees/${id}`, {
          method: "DELETE",
        });
        // Filter out the deleted employee from the employees array
        setEmployees(employees.filter((employee) => employee.id !== id));
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
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.fullname}</td>
                <td>{employee.address}</td>
                <td>{employee.dateOfBirth}</td>
                <td>{employee.contact}</td>
                <td>
                  {employee.department
                    ? employee.department.department_name
                    : "Unknown"}
                </td>
                <td>{employee.leaveLeft}</td>
                <td>
                  <Link
                    className="update-button"
                    to={`/editemployee/${employee.id}`}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(employee.id)}
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
