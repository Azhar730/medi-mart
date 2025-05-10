import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "/orders/create-order",
        method: "POST",
        body: payload,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getMyOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: (payload) => ({
        url: "/orders/update-status",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["orders"],
    }),
    getTotalSalesCount: builder.query({
      query: () => ({
        url: "/orders/total-sales",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getTopSellingMedicines: builder.query({
      query: () => ({
        url: "/orders/top-selling-medicines",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getRecentSellsMedicines: builder.query({
      query: () => ({
        url: "/orders/latest-orders",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getStockStats: builder.query({
      query: () => ({
        url: "/orders/stock-stats",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetMyOrderQuery,
  useVerifyOrderQuery,
  useUpdateOrderStatusMutation,
  useGetTotalSalesCountQuery,
  useGetTopSellingMedicinesQuery,
  useGetRecentSellsMedicinesQuery,
  useGetStockStatsQuery
} = orderApi;
