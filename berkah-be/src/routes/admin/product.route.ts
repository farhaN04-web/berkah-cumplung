import { uploadImage } from "./../../config/multer.config";
import { Roles } from "./../../constants/role.enum";
import { ProductController } from "./../../controllers/product.controller";
import {
  authMiddleware,
  authorizeRoleMiddleware,
} from "./../../middlewares/auth.middleware";
import { validateUploadHeaders } from "./../../middlewares/upload.middleware";
import express from "express";

const productRoute = express.Router();

productRoute.get(
  "/admin/products",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  ProductController.getAll
);

productRoute.get(
  "/admin/products/:id",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  ProductController.getById
);

productRoute.post(
  "/admin/products",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  validateUploadHeaders,
  uploadImage,
  ProductController.create
);

productRoute.put(
  "/admin/products/:id",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  validateUploadHeaders,
  uploadImage,
  ProductController.update
);

productRoute.delete(
  "/admin/products/:id",
  authMiddleware,
  authorizeRoleMiddleware(Roles.ADMIN),
  ProductController.delete
);

export default productRoute;
