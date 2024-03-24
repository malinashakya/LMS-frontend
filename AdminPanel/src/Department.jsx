import { useState, useEffect } from "react";
import "./Department.css"; // Import CSS file

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch departments from backend upon component mount
    const fetchDepartments = async () => {
      try {
        // Dummy data for demonstration
        const dummyData = [
          { id: 1, code: "DEP001", name: "Department 1", employees: 10 },
          { id: 2, code: "DEP002", name: "Department 2", employees: 15 },
          { id: 3, code: "DEP003", name: "Department 3", employees: 8 },
        ];

        setDepartments(dummyData);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError("Error fetching departments");
        setLoading(false);
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="department-container">
      <h2>Departments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="department-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Employees</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.id}>
                <td>{department.code}</td>
                <td>{department.name}</td>
                <td>{department.employees}</td>
                <td>
                  <button
                    className="department-button"
                    onClick={() => {
                      // Handle view department action
                      console.log(`View department ${department.name}`);
                    }}
                  >
                    View Department
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

export default Department;
