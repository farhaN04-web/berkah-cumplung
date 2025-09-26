import { DashboardController } from "./../../controllers/dashboard.controller";
import express from "express";

const dashboardRoute = express.Router();

dashboardRoute.get(
  "/admin/dashboard/get-total-transaction",
  DashboardController.getTotalTransaction
);

dashboardRoute.get(
  "/admin/dashboard/get-count-transaction",
  DashboardController.getCountTransaction
);

dashboardRoute.get(
  "/admin/dashboard/get-product-total",
  DashboardController.getProductTotal
);

dashboardRoute.get(
  "/admin/dashboard/get-customer-total",
  DashboardController.getCustomersTotal
);

export default dashboardRoute;
