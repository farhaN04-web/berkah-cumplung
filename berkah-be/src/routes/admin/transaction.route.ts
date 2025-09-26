import { Roles } from "./../../constants/role.enum";
import { TransactionController } from "./../../controllers/transaction.controller";
import {
  authMiddleware,
  authorizeRoleMiddleware,
} from "./../../middlewares/auth.middleware";
import express from "express";

const transactionRoute = express.Router();

transactionRoute.get(
  "/admin/transactions",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  TransactionController.getAllTransaction
);

transactionRoute.get(
  "/admin/sales-by-category",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  TransactionController.getSalesByCategory
);

transactionRoute.get(
  "/admin/sales-stats",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  TransactionController.getSalesStats
);

transactionRoute.get(
  "/admin/transactions/:id",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  TransactionController.getTransactionById
);

transactionRoute.put(
  "/admin/transactions/:id",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  TransactionController.updateStatusTransaction
);

export default transactionRoute;
