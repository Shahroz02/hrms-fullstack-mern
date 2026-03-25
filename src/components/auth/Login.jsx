import "../../styles/auth.css";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="login-container">
      <h2>Login</h2>
      <button onClick={() => login("Admin")}>Login as Admin</button>
      <button onClick={() => login("HR")}>Login as HR</button>
      <button onClick={() => login("Employee")}>Login as Employee</button>
    </div>
  );
};

export default Login;
