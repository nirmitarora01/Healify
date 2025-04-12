const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Appointment = require("../models/Appointment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount, receipt } = req.body;
    const options = {
      amount: amount * 100, // Amount in paise (e.g., ₹100 = 10000 paise)
      currency: "INR",
      receipt: receipt,
    };

    razorpay.orders.create(options, (err, order) => {
      if (err) {
        console.error("Razorpay order creation failed:", err);
        return res.status(500).json({ message: "Error creating Razorpay order", error: err });
      }
      res.json(order);
    });
  } catch (error) {
    console.error("Error in /create-order:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

router.post("/verify-payment", async (req, res) => {
  try {
    const { order_id, payment_id, signature, appointmentId } = req.body;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(order_id + "|" + payment_id)
      .digest("hex");

    if (generated_signature === signature) {
      // Payment successful
      res.json({ message: "Payment successful and appointment confirmed" });
      // after verifying the signature:
      await Appointment.findByIdAndUpdate(appointmentId, { status: 'Confirmed' });
    } else {
      // Payment failed
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error in /verify-payment:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;