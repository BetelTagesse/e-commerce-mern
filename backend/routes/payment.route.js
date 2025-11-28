// import express from "express";
// import { protectRoute } from "../middleware/auth.middleware";

// const router = express.Router();

// router.post("/create-checkout-session", protectRoute, async (req, res) => {
//   try {
//     const { products } = req.body;

//     if (Array.isArray(products) || products.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Invalid or empty products array" });
//     }

//     let totalAmount = 0;
//     const lineItems = products.map((product) => {
//       const amount = Math.round(product.price * 100);
//       totalAmount += amount * product.quantity;

//       return {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: product.name,
//             images: [product.image],
//           },
//           unit_amount: amount,
//         },
//         quantity: product.quantity,
//       };
//     });

//     const session = await Stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url:
//         "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
//     });
//   } catch (error) {}
// });

import express from "express";
import {
  initializePayment,
  verifyPayment,
} from "../controllers/payment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/initialize", protectRoute, initializePayment);
router.get("/verify/:tx_ref", protectRoute, verifyPayment);

export default router;
