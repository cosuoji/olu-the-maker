import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  getOrders,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// Create a new order (Logged-in users only)
router.route("/").post(protect, addOrderItems);

// Get a specific order by ID (Logged-in users only)
router.route("/:id").get(protect, getOrderById);

// Admin-only route to see all orders (Future dashboard)
router.route("/").get(protect, admin, getOrders);

// Update order to paid (Logged-in users only)
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
