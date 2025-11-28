import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;

// ⭐ Initialize Payment (Generate payment link)
export const initializePayment = async (req, res) => {
  try {
    const { amount, currency, email, first_name, last_name } = req.body;

    const tx_ref = "tx-" + uuidv4(); // unique reference

    const data = {
      amount,
      currency: currency || "ETB",
      email,
      first_name,
      last_name,
      tx_ref,
      callback_url: process.env.CHAPA_CALLBACK_URL + tx_ref,
      return_url: process.env.CHAPA_RETURN_URL,
    };

    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      data,
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status !== "success") {
      return res.status(400).json({ message: "Failed to initialize payment" });
    }

    return res.status(200).json({
      checkout_url: response.data.data.checkout_url,
      tx_ref,
    });
  } catch (error) {
    console.error("Chapa Init Error:", error.response?.data || error.message);
    return res.status(500).json({ message: "Payment initialization failed" });
  }
};

// ⭐ Verify payment status
export const verifyPayment = async (req, res) => {
  try {
    const { tx_ref } = req.params;

    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
        },
      }
    );

    if (response.data.status === "success") {
      return res.status(200).json({
        message: "Payment verified successfully",
        data: response.data.data,
      });
    } else {
      return res.status(400).json({
        message: "Payment not verified",
      });
    }
  } catch (error) {
    console.error("Chapa Verify Error:", error.response?.data || error.message);
    return res.status(500).json({ message: "Verification failed" });
  }
};
