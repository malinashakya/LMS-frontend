import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = ({ role }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8084/employees/${id}`
        );
        setEmployee(response.data);
        setError("");
      } catch (error) {
        setError("Employee not found");
        console.error("Error fetching employee:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "department" && role !== "admin") {
      alert("Only Admins are allowed to change the department");
      return;
    }

    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8084/employees/${id}`, employee);
      console.log("Employee updated successfully!");
      // Navigate based on the role
      navigate(role === "admin" ? "/employees" : `/employee-record/${id}`);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="edit-employee-container">
      <h2>Edit Employee</h2>
      <form className="edit-employee-form" onSubmit={onSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullname"
            value={employee.user?.fullname || ""}
            onChange={handleChange}
            disabled
          />
        </label>
        <label>
          Address:{" "}
          <input
            type="text"
            name="address"
            value={employee.address || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Birth: <br />
          <input
            type="text"
            placeholder="YYYY/MM/DD"
            name="date_of_birth"
            value={employee.date_of_birth || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Contact:{" "}
          <input
            type="text"
            name="contact"
            value={employee.contact || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Department:{" "}
          <input
            type="text"
            name="department"
            value={
              employee.department
                ? employee.department.department_name
                : "Unknown" || ""
            }
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EditEmployee;
