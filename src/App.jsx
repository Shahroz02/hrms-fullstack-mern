import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import EditEmployee from "./components/Employees/EditEmployee";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Leave from "./pages/Leave";
import Attendance from "./pages/Attendance";
import Layout from "./components/Layout/Layout";
import AddEmployee from "./components/Employees/AddEmployee";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
  path="/employees"
  element={
    <ProtectedRoute allowedRoles={["Admin", "HR"]}>
      <Employees />
    </ProtectedRoute>
  }
/>

            <Route
  path="/leave"
  element={
    <ProtectedRoute>
      <Leave />
    </ProtectedRoute>
  }
/>

            <Route
  path="/attendance"
  element={
    <ProtectedRoute allowedRoles={["Admin", "HR"]}>
      <Attendance />
    </ProtectedRoute>
  }
/>

            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/employees/edit/:id" element={<EditEmployee />} />


          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
