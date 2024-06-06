import { useState, useEffect } from "react";
import {
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function Home() {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [leavesCount, setLeavesCount] = useState(0);
  const [departmentsCount, setDepartmentsCount] = useState(0);

  useEffect(() => {
    // Fetch employees count
    fetch("http://localhost:8084/employees")
      .then((response) => response.json())
      .then((data) => setEmployeesCount(data.length))
      .catch((error) => console.error("Error fetching employees:", error));

    // Fetch leaves count
    fetch("http://localhost:8084/leaves")
      .then((response) => response.json())
      .then((data) => setLeavesCount(data.length))
      .catch((error) => console.error("Error fetching leaves:", error));

    // Fetch departments count
    fetch("http://localhost:8084/departments")
      .then((response) => response.json())
      .then((data) => setDepartmentsCount(data.length))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  const data = [
    { name: "Employees", value: employeesCount },
    { name: "Users", value: employeesCount },
    { name: "Departments", value: departmentsCount },
    { name: "Leaves", value: leavesCount }, // Assuming this is the count of leaves
  ];

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>USERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{employeesCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>DEPARTMENT</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{departmentsCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>EMPLOYEES</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{employeesCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Leaves</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>{leavesCount}</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
