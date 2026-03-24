import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import Order from "../models/orderModel.js";
import { sendEmail } from "../utils/mailer.jsx";
import crypto from "crypto";

// @desc    Auth user & get token
// @route   POST /api/users/login
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// @desc    Register a new user
// @route   POST /api/users
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    // 1. Send the response to the frontend immediately
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });

    // 2. Fire off the email asynchronously (Don't await it here)
    // We attach a .catch just in case it throws an unhandled promise rejection
    sendEmail("WELCOME", email, { name }).catch((err) =>
      console.error("Background Email Task Failed:", err),
    );
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @desc    Get user profile with populated wishlist
export const getUserProfile = async (req, res) => {
  // Use .populate if you want the full product details in the wishlist
  const user = await User.findById(req.user._id)
    .populate("wishlist")
    .select("-password");

  const orders = await Order.find({ user: req.user._id });

  if (user) {
    res.json({ user, orders });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Update user profile & address
// @route   PUT /api/users/profile
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    // --- FIXED ADDRESS LOGIC ---
    if (req.body.address) {
      // Check if the user already has an address in the array
      if (user.addresses.length > 0) {
        // Update the first address in the array
        user.addresses[0].addressLine1 =
          req.body.address.street || user.addresses[0].addressLine1;
        user.addresses[0].city =
          req.body.address.city || user.addresses[0].city;
        user.addresses[0].state =
          req.body.address.state || user.addresses[0].state;
        user.addresses[0].country =
          req.body.address.country || user.addresses[0].country;
        user.addresses[0].postalCode =
          req.body.address.postalCode || user.addresses[0].postalCode;
      } else {
        // If no address exists, push a new one
        user.addresses.push({
          addressLine1: req.body.address.street,
          city: req.body.address.city,
          state: req.body.address.state,
          country: req.body.address.country,
          postalCode: req.body.address.postalCode,
          isDefault: true,
        });
      }
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      // Return the first address so the frontend state stays in sync
      address: updatedUser.addresses[0] || {},
      isAdmin: updatedUser.isAdmin,
      wishlist: updatedUser.wishlist,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Add shipping address
// @route   POST /api/users/address
export const addUserAddress = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const newAddress = {
      addressLine1: req.body.addressLine1,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
      isDefault: user.addresses.length === 0, // First address becomes default
    };
    user.addresses.push(newAddress);
    await user.save();
    res.status(201).json(user.addresses);
  }
};

// @desc    Set default address
// @route   PUT /api/users/address/:id/default
export const setDefaultAddress = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.addresses.forEach((addr) => {
      addr.isDefault = addr._id.toString() === req.params.id;
    });
    await user.save();
    res.json(user.addresses);
  }
};

// @desc    Toggle item in wishlist
// @route   POST /api/users/wishlist
export const manageWishlist = async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    const alreadyExists = user.wishlist.find(
      (id) => id.toString() === productId,
    );
    if (alreadyExists) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    } else {
      user.wishlist.push(productId);
    }
    await user.save();
    res.json(user.wishlist);
  }
};

// 1. GET ALL USERS (With basic filtering)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Forgot Password - Send Email
// @route   POST /api/users/forgotpassword
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    // For security, don't reveal if user exists. Just send 200.
    return res.status(200).json({ message: "Recovery email dispatched." });
  }

  // Generate Reset Token (The raw version for the email link)
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash the token to save in the database securely
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expiration (1 hour from now)
  user.resetPasswordExpire = Date.now() + 3600000;

  // Save the user with the new token and expiration
  await user.save();

  // Make sure FRONTEND_URL is defined in your Render/local .env
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  // Attempt to send the email
  const emailResponse = await sendEmail("RESET_PASSWORD", user.email, {
    resetLink: resetUrl,
  });

  // If sendEmail returns null (meaning our previous error block caught a failure)
  if (!emailResponse) {
    // Rollback the DB changes so the user isn't locked out with a broken token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res
      .status(500)
      .json({ message: "Email could not be sent. Please try again." });
  }

  // Success
  res.status(200).json({ message: "Recovery email dispatched." });
};

export const resetPassword = async (req, res) => {
  // 1. Hash the token from the URL to match the one in our DB
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, // Check if token is still valid
  });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Invalid or expired recovery link." });
  }

  // 2. Set new password (your User model's .pre('save') should handle the hashing)
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({ message: "Credentials updated successfully." });
};
