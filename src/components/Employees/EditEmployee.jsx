import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Services/api";
import "../../styles/form.css";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    manager: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      const res = await api.get(`/employees/${id}`);
      setFormData(res.data);
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/employees/${id}`, formData);
    navigate("/employees");
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Edit Employee</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          value={formData.email}
          disabled
        />

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option>HR</option>
          <option>IT</option>
          <option>Finance</option>
        </select>

        <input
          name="manager"
          value={formData.manager}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
