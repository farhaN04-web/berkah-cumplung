import express from "express";
import { CategoryController } from "./../../controllers/category.controller";
import {
  authMiddleware,
  authorizeRoleMiddleware,
} from "./../../middlewares/auth.middleware";
import { Roles } from "./../../constants/role.enum";

const categoryRoute = express.Router();

categoryRoute.get(
  "/admin/categories",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  CategoryController.getAll
);

categoryRoute.get(
  "/admin/categories/:id",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  CategoryController.getById
);

categoryRoute.post(
  "/admin/categories",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  CategoryController.create
);

categoryRoute.put(
  "/admin/categories/:id",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  CategoryController.update
);

categoryRoute.delete(
  "/admin/categories/:id",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  CategoryController.delete
);

export default categoryRoute;
