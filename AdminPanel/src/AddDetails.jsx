import { useState, useEffect } from "react";
import axios from "axios";
import "./AddDetails.css";
import { useNavigate } from "react-router-dom";

const AddDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    fullname: "",
    address: "",
    dob: "",
    contact: "",
    department: {
      department_code: "",
      department_name: "",
    },
  });
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8084/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setError("Error fetching departments");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "department") {
      const selectedDepartment = departments.find(
        (department) => department.department_code === e.target.value
      );
      setFormData({
        ...formData,
        department: {
          department_code: selectedDepartment.department_code,
          department_name: selectedDepartment.department_name,
        },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8084/employee", formData);
      if (res.status === 200 || res.status === 201) {
        console.log("Employee added successfully!");
        setFormData({
          id: "",
          fullname: "",
          address: "",
          dob: "",
          contact: "",
          department: {
            department_code: "",
            department_name: "",
          },
        });
        navigate("/employees");
      } else {
        throw new Error("Error adding employee");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Error adding employee");
    }
  };

  return (
    <div className="add-details-container">
      <h2>Add Employee Details</h2>
      <form className="add-details-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Fullname:</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="text"
            name="dob"
            placeholder="YYYY/MM/DD"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <select name="department" onChange={handleChange}>
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option
                key={department.department_code}
                value={department.department_code}
              >
                {`${department.department_code} - ${department.department_name}`}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDetails;
