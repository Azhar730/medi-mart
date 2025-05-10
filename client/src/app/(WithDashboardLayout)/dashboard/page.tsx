"use client";

import PrivateRoute from "@/Routes/PrivateRoute";
import { Users, DollarSign, Package, User2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { useGetUsersCountQuery } from "@/redux/features/user/userApi";
import {
  useGetRecentSellsMedicinesQuery,
  useGetStockStatsQuery,
  useGetTopSellingMedicinesQuery,
  useGetTotalSalesCountQuery,
} from "@/redux/features/order/orderApi";
import { useGetAvailableMedicineCountQuery } from "@/redux/features/medicine/medicineApi";
import { useGetRatingCountQuery } from "@/redux/features/review/reviewApi";

const DashboardHome = () => {
  const { data: userCount } = useGetUsersCountQuery({});
  const { data: totalSalesCount } = useGetTotalSalesCountQuery({});
  const { data: totalAvailableMedicineCount } =
    useGetAvailableMedicineCountQuery({});
  const { data: totalRatingCount } = useGetRatingCountQuery({});
  const { data: topSellingMedicine } = useGetTopSellingMedicinesQuery({});
  const { data: recentSellsMedicine } = useGetRecentSellsMedicinesQuery({});
  const { data: stockStats } = useGetStockStatsQuery({});
  const analyticsData = {
    totalUsers: userCount?.data,
    totalSales: totalSalesCount?.data,
    totalInventory: totalAvailableMedicineCount?.data,
    customerSatisfaction: totalRatingCount?.data,
  };
  const topMedicines = topSellingMedicine?.data ?? [];
  interface Order {
    _id: string;
    user: { name: string };
    medicines: {
      medicine: { name: string; price: number };
      quantity: number;
    }[];
    status: string;
  }

  const recentOrders = recentSellsMedicine?.data?.flatMap((order: Order) =>
    order.medicines.map((item) => ({
      id: order?._id,
      customer: order?.user?.name,
      medicine: item?.medicine?.name,
      price: item?.medicine?.price * item?.quantity,
      status: order?.status === "Paid" ? "Completed" : "Pending",
    }))
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const available = stockStats?.data?.availablePercentage ?? 0;
  const sold = stockStats?.data?.soldPercentage ?? 0;
  const inventoryChartData =
    available === 0 && sold === 0
      ? [{ name: "No Data", value: 1 }]
      : [
          { name: "Available", value: available },
          { name: "Sold", value: sold },
        ];

  const COLORS = ["#3B82F6", "#60A5FA"];

  return (
    <PrivateRoute>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-blue-700">
            Welcome to MediMart
          </h1>
          <p className="text-gray-600 text-sm">
            Here is an overview of your online pharmacy performance.
          </p>
        </motion.div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: <User2 className="text-white" />,
              label: "Total Users",
              value: formatCurrency(analyticsData.totalUsers),
              bg: "bg-indigo-500",
            },
            {
              icon: <DollarSign className="text-white" />,
              label: "Total Sales",
              value: formatCurrency(analyticsData.totalSales),
              bg: "bg-blue-600",
            },
            {
              icon: <Package className="text-white" />,
              label: "Inventory Available",
              value: `${analyticsData.totalInventory} medicines`,
              bg: "bg-purple-500",
            },
            {
              icon: <Users className="text-white" />,
              label: "Customer Rating",
              value: `${analyticsData.customerSatisfaction}/5.0`,
              bg: "bg-yellow-500",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-xl text-white shadow-md ${item.bg}`}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xl font-semibold">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Top Selling Medicines
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topMedicines}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Inventory Distribution
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={inventoryChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                >
                  {inventoryChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.name === "No Data"
                          ? "#E5E7EB" // Gray color for no data
                          : COLORS[index % COLORS.length]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Orders
          </h2>
          <table className="min-w-full">
            <thead className="bg-blue-50">
              <tr>
                {["Customer", "Medicine", "Price", "Status"].map((title) => (
                  <th
                    key={title}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders?.map(
                (order: {
                  id: string;
                  customer: string;
                  medicine: string;
                  price: number;
                  status: string;
                }) => (
                  <tr key={order.id + order.medicine}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.medicine}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {`$${order.price}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </main>
    </PrivateRoute>
  );
};

export default DashboardHome;
