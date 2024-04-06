import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ViewDepartment.css";

export default function ViewDepartment() {
  const [department, setDepartment] = useState({
    department_code: "",
    department_name: "",
  });

  const { department_code } = useParams();

  useEffect(() => {
    loadDepartment();
  }, []);

  const loadDepartment = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8084/departments/${department_code}`
      );
      setDepartment(result.data);
    } catch (error) {
      console.error("Error loading department:", error);
    }
  };

  return (
    <div className="container">
      <div className="main">
        <div className="heading">
          <h2>Department Details</h2>{" "}
        </div>
        <div className="heading">
          <Link className="buttons" to="/department">
            Back to Department List
          </Link>
        </div>

        <div className="details">
          <ul>
            <li>
              <b>Department ID:</b> {department.department_code}
            </li>
            <li>
              <b>Department Name:</b> {department.department_name}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
