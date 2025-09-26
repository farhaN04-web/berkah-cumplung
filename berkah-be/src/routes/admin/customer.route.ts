import { Roles } from "./../../constants/role.enum";
import { CustomerController } from "./../../controllers/customer.controller";
import {
  authMiddleware,
  authorizeRoleMiddleware,
} from "./../../middlewares/auth.middleware";
import express from "express";

const customerRoute = express.Router();

customerRoute.get(
  "/admin/customers",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  CustomerController.getAllCustomers
);

export default customerRoute;
