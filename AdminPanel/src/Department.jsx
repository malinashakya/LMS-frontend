import { useState, useEffect } from "react";
import axios from "axios";
import "./Department.css"; // Import CSS file
import { Link, useParams } from "react-router-dom";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { department_code } = useParams();

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const result = await axios.get("http://localhost:8084/departments");
      setDepartments(result.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError("Error fetching departments");
      setLoading(false);
      console.error("Error fetching departments:", error);
    }
  };

  const deleteDepartment = async (department_code) => {
    try {
      if (window.confirm("Are you sure you want to delete this department?")) {
        await axios.delete(
          `http://localhost:8084/departments/${department_code}`
        );
        loadDepartments();
      }
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <div className="department-container">
      <h2>Departments</h2>
      <h4>
        <Link className="department-add-button" to={"/adddepartment"}>
          Add Department
        </Link>
      </h4>

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
              <th colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.department_code}>
                <td>{department.department_code}</td>
                <td>{department.department_name}</td>
                <td>Number of employee</td>
                <td>
                  <Link
                    className="department-view-button"
                    to={`/viewdepartment/${department.department_code}`}
                  >
                    View
                  </Link>
                </td>
                <td>
                  <Link
                    className="department-button"
                    to={`/editdepartment/${department.department_code}`}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="department-delete-button"
                    onClick={() => deleteDepartment(department.department_code)}
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

export default Department;
