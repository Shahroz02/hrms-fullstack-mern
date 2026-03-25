import "../../styles/layout.css";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div className="navbar">
      <h2>HRMS</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;
