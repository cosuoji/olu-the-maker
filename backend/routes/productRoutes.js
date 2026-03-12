import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// Public routes
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

// Protected Admin routes
router.route("/").post(protect, admin, createProduct);
router.route("/:id").delete(protect, admin, deleteProduct);

export default router;
