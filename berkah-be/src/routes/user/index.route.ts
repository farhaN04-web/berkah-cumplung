import { uploadImage } from "./../../config/multer.config";
import { Roles } from "./../../constants/role.enum";
import { CartController } from "./../../controllers/cart.controller";
import { CheckoutController } from "./../../controllers/checkout.controller";
import { UserController } from "./../../controllers/user.controller";
import {
  authMiddleware,
  authorizeRoleMiddleware,
} from "./../../middlewares/auth.middleware";
import { validateUploadHeaders } from "./../../middlewares/upload.middleware";
import { CheckoutService } from "./../../services/checkout.service";
import express from "express";

const userRoute = express.Router();

/**
 * Route User Profile Management
 */

// Route to get User Profile
userRoute.get(
  "/user/profile",
  authMiddleware,
  authorizeRoleMiddleware(Roles.USER),
  UserController.getProfile
);

// Route to update User Profile
userRoute.put(
  "/user/profile",
  authMiddleware,
  authorizeRoleMiddleware(Roles.USER),
  UserController.updateProfile
);

// Route to change User Password
userRoute.put(
  "/user/change-password",
  authMiddleware,
  authorizeRoleMiddleware(Roles.USER),
  UserController.changePassword
);

// Route to update Profile Image
userRoute.put(
  "/user/profile/image",
  authMiddleware,
  authorizeRoleMiddleware(Roles.USER),
  uploadImage,
  validateUploadHeaders,
  UserController.updateProfileImage
);

/**
 * Route to Cart Management
 */

// Route to get User Cart
userRoute.get(
  "/user/cart",
  authMiddleware,
  authorizeRoleMiddleware(Roles.USER),
  CartController.getCarts
);

// Route to post user cart
userRoute.post(
  "/user/cart",
  authMiddleware,
  authorizeRoleMiddleware(Roles.USER),
  CartController.addToCart
);

// Route to update user cart
userRoute.put(
  "/user/cart/:id",
  authMiddleware,
  authorizeRoleMiddleware(Roles.USER),
  CartController.updateCart
);

// Route to delete user cart
userRoute.delete(
  "/user/cart/:id",
  authMiddleware,
  authorizeRoleMiddleware(Roles.USER),
  CartController.deleteCart
);

// Route checkout
userRoute.post(
  "/user/cart/checkout",
  authMiddleware,
  authorizeRoleMiddleware(Roles.USER),
  CheckoutController.checkout
);

// Route to get user order history
userRoute.get(
  "/user/order-history",
  authMiddleware,
  authorizeRoleMiddleware(Roles.USER),
  CheckoutController.checkoutHistory
);

export default userRoute;
