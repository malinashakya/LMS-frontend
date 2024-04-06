import { useState } from "react";
import "./AddDepartment.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddDepartment() {
  let navigate = useNavigate();

  const [departmentCode, setDepartmentCode] = useState("");
  const [departmentName, setDepartmentName] = useState("");

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
    console.log("Form submitted:", departmentCode, departmentName);
    try {
      await axios.post("http://localhost:8084/department", {
        department_code: departmentCode,
        department_name: departmentName,
      });
      navigate("/department");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="form">
          <h2>Add Department</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="departmentCode">Department Code:</label>
              <input
                type="text"
                id="departmentCode"
                name="departmentCode"
                value={departmentCode}
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
                value={departmentName}
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
