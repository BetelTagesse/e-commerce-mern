import Product from "../models/product.model";
import User from "../models/user.model";

export const getAnalyticsData = async () => {
  const totalUser = await User.countDocuments();
  const totalProducts = await Product.countDocuments();

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$totalAmount" },
        totalOrders: { $sum: 1 },
      },
    },
  ]);
};
