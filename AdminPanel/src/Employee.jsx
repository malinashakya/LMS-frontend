import { useState, useEffect } from "react";
import "./Employee.css"; // Import CSS file

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch employees from backend upon component mount
    const fetchEmployees = async () => {
      try {
        // Dummy data for demonstration
        const dummyData = [
          {
            id: 1,
            fullname: "John Doe",
            address: "123 Main St",
            dob: "1990-01-01",
            contact: "123-456-7890",
            department: "Engineering",
            leaveLeft: 10,
          },
          {
            id: 2,
            fullname: "Jane Smith",
            address: "456 Elm St",
            dob: "1995-05-15",
            contact: "987-654-3210",
            department: "Marketing",
            leaveLeft: 8,
          },
          {
            id: 3,
            fullname: "Alice Johnson",
            address: "789 Oak St",
            dob: "1988-10-20",
            contact: "555-123-4567",
            department: "Human Resources",
            leaveLeft: 12,
          },
        ];

        setEmployees(dummyData);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError("Error fetching employees");
        setLoading(false);
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleUpdate = (id) => {
    // Implement update logic here
    console.log(`Update employee with id ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete logic here
    console.log(`Delete employee with id ${id}`);
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
              <th colSpan={2}>Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.fullname}</td>
                <td>{employee.address}</td>
                <td>{employee.dob}</td>
                <td>{employee.contact}</td>
                <td>{employee.department}</td>
                <td>{employee.leaveLeft}</td>
                <td>
                  <button
                    className="update-button"
                    onClick={() => handleUpdate(employee.id)}
                  >
                    Update
                  </button>
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
