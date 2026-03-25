import Employee from "../models/Employee.js";

// GET all employees
export const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

// CREATE employee
export const createEmployee = async (req, res) => {
  try {
    const { name, email, department, manager } = req.body;

    const employee = await Employee.create({
      user: req.user.id,   
      name,
      email,
      department,
      manager
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE employee
export const updateEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(employee);
};

// DELETE employee ✅ (THIS WAS MISSING)
export const deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // If role is Employee → allow only their own record
    if (
      req.user.role === "Employee" &&
      employee.user.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

