import { useState, useEffect } from "react";
import axios from "axios";
import "./AddDetails.css";

const AddDetails = () => {
  const [formData, setFormData] = useState({
    id: "",
    fullname: "",
    address: "",
    dob: "",
    contact: "",
    department: "", // Add department field
    // Add more fields as needed
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user details from backend upon component mount (optional)
    // Remove this section if not needed
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit form data to backend
    try {
      const res = await axios.post(
        "http://localhost:8084/employee", // Update URL to the provided endpoint
        formData
      );
      if (res.status === 200 || res.status === 201) {
        // Check for success status codes
        console.log("Employee added successfully!");
        // Clear the form or show a success message
        setFormData({
          id: "",
          fullname: "",
          address: "",
          dob: "",
          contact: "",
          department: "",
        });
      } else {
        throw new Error("Error adding employee"); // Throw error for unexpected status codes
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Error adding employee"); // Set error message
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
            type="date"
            name="dob"
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
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>
        {/* Add more fields as needed */}
        {error && <p className="error-message">{error}</p>}
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDetails;
