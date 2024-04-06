import { useEffect, useState } from "react";
import "./AddDepartment.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditDepartment() {
  let navigate = useNavigate();
  const { department_code } = useParams();

  // Separate state for departmentCode and departmentName
  const [departmentCode, setDepartmentCode] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log("Loading Department...");
      try {
        const result = await axios.get(
          `http://localhost:8084/departments/${department_code}`
        );
        console.log("Department Data:", result.data);
        setDepartmentCode(result.data.department_code); // Update departmentCode state
        setDepartmentName(result.data.department_name); // Update departmentName state
      } catch (error) {
        console.error("Error loading department data:", error);
      }
    };

    fetchData();
  }, [department_code]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "departmentCode") {
      setDepartmentCode(value);
    } else if (name === "departmentName") {
      setDepartmentName(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Form:", departmentCode, departmentName);
    try {
      await axios.put(`http://localhost:8084/departments/${department_code}`, {
        department_code: departmentCode,
        department_name: departmentName,
      });
      navigate("/department");
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="form">
          <h2>Edit Department</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="departmentCode">Department Code:</label>
              <input
                type="text"
                id="departmentCode"
                name="departmentCode"
                value={departmentCode || ""}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="departmentName">Department Name:</label>
              <input
                type="text"
                id="departmentName"
                name="departmentName"
                value={departmentName || ""}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Submit</button>
              <Link className="button-cancel" type="button" to="/department">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
