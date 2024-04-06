import { useState } from "react";
import "./AddDepartment.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddDepartment() {
  let navigate = useNavigate();
  const [department, setDepartment] = useState({
    departmentCode: "",
    departmentName: "",
  });

  const { departmentCode, departmentName } = department;

  const onInputChange = (event) => {
    setDepartment({
      ...department,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:8084/department", department);
    navigate("/department");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="form">
          <h2>Add Department</h2>
          <form onSubmit={(event) => onSubmit(event)}>
            <div className="form-group">
              <label htmlFor="departmentCode">Department Code:</label>
              <input
                type="text"
                id="departmentCode"
                name="departmentCode"
                value={departmentCode}
                onChange={(event) => onInputChange(event)}
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
                onChange={(event) => onInputChange(event)}
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
