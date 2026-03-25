import express from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/employeeController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin + HR can see all employees
router.get("/", protect, authorize("Admin", "HR"), getEmployees);

// Everyone logged in can access single employee (but controlled inside controller)
router.get("/:id", protect, getEmployeeById);

// Admin + HR can create
router.post("/", protect, authorize("Admin", "HR"), createEmployee);

// Admin + HR can update
router.put("/:id", protect, authorize("Admin", "HR"), updateEmployee);

// Admin ONLY can delete
router.delete("/:id", protect, authorize("Admin"), deleteEmployee);

export default router;
