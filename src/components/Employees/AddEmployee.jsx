import { useState } from "react";
import "../../styles/form.css";
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    manager: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/employees", formData);
      navigate("/employees");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Add Employee</h2>

        <input
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option>HR</option>
          <option>IT</option>
          <option>Finance</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Employee Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="manager"
          placeholder="Manager Name"
          value={formData.manager}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
