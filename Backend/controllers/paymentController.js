import axios from "axios";

export const initializePayment = async (req, res) => {
  try {
    const { email, amount, method } = req.body;

    // ✅ Handle Cash Option
    if (method === "cash") {
      return res.json({
        status: "cash_pending",
        message: "Customer will pay cash on pickup"
      });
    }

    // ✅ Handle Paystack Payment
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
        currency: "GHS"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
};