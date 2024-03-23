import { useState, useEffect } from "react";
import axios from "axios";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch employees from backend upon component mount
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/employees");
        setEmployees(response.data);
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

  return (
    <div>
      <h2>Employees</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>{employee.fullname}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Employee;
