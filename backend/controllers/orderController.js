import Order from "../models/orderModel.js";
import axios from "axios";
import { sendEmail } from "../utils/mailer.jsx";

// @desc    Create new order
// @route   POST /api/orders
// @desc    Create new order
// @route   POST /api/orders
export const addOrderItems = async (req, res) => {
  const {
    orderItems, // This now includes the bespoke details from our Zustand store
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  const order = new Order({
    orderItems: orderItems.map((x) => ({
      ...x,
      product: x.id, // mapping frontend 'id' to backend 'product'
      configuration: {
        size: x.size,
        width: x.width,
        last: x.last,
        material: x.material,
        sole: x.sole,
        format: x.format,
      },
      _id: undefined, // clean up id so mongo creates a fresh one for the subdoc
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

// @desc    Update order to paid (The Flutterwave Verification)
// @route   PUT /api/orders/:id/pay
export const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  // The 'transaction_id' comes from the Flutterwave response on the frontend
  const { transaction_id } = req.body;

  try {
    // 1. Verify with Flutterwave directly
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      },
    );

    const { status, amount, currency, customer } = response.data.data;

    // 2. Cross-check the data to prevent "Man-in-the-middle" attacks
    const isMatch =
      status === "successful" &&
      amount >= order.totalPrice &&
      currency === "USD"; // Ensure this matches your store's currency

    if (isMatch) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: transaction_id,
        status: status,
        update_time: Date.now().toString(),
        email_address: customer.email,
      };

      const updatedOrder = await order.save();
      await sendEmail("ORDER_CONFIRMED", req.user.email, {
        orderId: order._id.toString(),
        totalPrice: order.totalPrice,
        items: order.orderItems,
      });

      res.json(updatedOrder);
    } else {
      res
        .status(400)
        .json({ message: "Payment verification failed: Data mismatch." });
    }
  } catch (error) {
    console.error("Flutterwave Verification Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error during payment verification." });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
export const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
};
