import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware";
import { getAnalyticsData } from "../controllers/analytics.controller";

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySalesData = await getDailySalesData(startDate, endDate);

    res.json({
      analyticsData,
      dailySalesData,
    });
  } catch (error) {
    console.log("error in analytics route");
    res.status(500).json({ message: "server error", error: error.message });
  }
});

export default router;
