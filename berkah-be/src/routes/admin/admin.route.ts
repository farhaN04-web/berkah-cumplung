import { Roles } from "./../../constants/role.enum";
import { UserController } from "./../../controllers/user.controller";
import {
  authMiddleware,
  authorizeRoleMiddleware,
} from "./../../middlewares/auth.middleware";
import express from "express";

const adminRoute = express.Router();

export default adminRoute;
