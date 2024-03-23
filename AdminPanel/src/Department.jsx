import { useState, useEffect } from "react";
import axios from "axios";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch departments from backend upon component mount
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/departments"
        );
        setDepartments(response.data);
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
    <div>
      <h2>Departments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {departments.map((department) => (
            <li key={department.id}>{department.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Department;
