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
    // Fetch user details from backend upon component mount
    const fetchUserDetails = async () => {
      if (formData.id) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/user/${formData.id}`
          );
          setFormData({ ...formData, fullname: response.data.fullname }); // Automatically fill fullname field
          setError(""); // Reset error if user is found
        } catch (error) {
          setFormData({ ...formData, fullname: "" }); // Clear fullname field
          setError("Employee not found with the provided ID"); // Set error message
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [formData.id]); // Fetch details whenever id changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit form data to backend
    try {
      const res = await axios.post(
        "http://localhost:8080/api/employees",
        formData
      );
      console.log(res.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
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
            readOnly
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
          {" "}
          {/* Department field */}
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
