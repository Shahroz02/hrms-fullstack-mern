import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import "../../styles/employee.css";
import { useAuth } from "../../context/AuthContext";


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    await api.delete(`/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div className="employee-page">
      <h2>Employees</h2>

      {employees.map(emp => (
        <div key={emp._id} className="employee-card">
          <div>
            <strong>{emp.name}</strong>
            <p>{emp.department} | Manager: {emp.manager}</p>
            <p>{emp.email}</p>
          </div>

          <div className="employee-actions">
            {(user?.role === "Admin" || user?.role === "HR") && (
  <button onClick={() => navigate(`/employees/edit/${emp._id}`)}>
  Edit
</button>
)}


            {user?.role === "Admin" && (
  <button onClick={() => deleteEmployee(emp._id)}>
  Delete
</button>
)}

          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
