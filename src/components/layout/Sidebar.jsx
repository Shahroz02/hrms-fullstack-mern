import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <Link to="/dashboard">Dashboard</Link>

      {(user?.role === "Admin" || user?.role === "HR") && (
        <div className="sidebar-group">
          <span className="sidebar-title">Employees</span>
          <Link to="/employees" className="sidebar-sub">
            Employee List
          </Link>
          <Link to="/add-employee" className="sidebar-sub">
            Add Employee
          </Link>
        </div>
      )}

      {user?.role !== "Employee" && (
        <Link to="/attendance">Attendance</Link>
      )}

      <Link to="/leave">Leave</Link>
    </div>
  );
};

export default Sidebar;
