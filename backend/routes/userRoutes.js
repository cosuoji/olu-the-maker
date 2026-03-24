import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  manageWishlist,
  getUsers,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { sendEmail } from "../utils/mailer.jsx";
import Order from "../models/orderModel.js";

router.post("/", registerUser);
router.post("/login", authUser);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

// Profile & Update
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Wishlist
router.route("/wishlist").post(protect, manageWishlist);

// Admin Routes
router.route("/").get(protect, admin, getUsers);

router.post("/orders/:id/remind", protect, admin, async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");
  const paymentLink = `${process.env.FRONTEND_URL}/payment?orderId=${order._id}`;

  await sendEmail("PAYMENT_REMINDER", order.user.email, {
    name: order.user.name,
    orderId: order._id.toString(),
    totalPrice: order.totalPrice,
    paymentLink,
  });

  res.json({ message: "Reminder sent to client." });
});

export default router;
