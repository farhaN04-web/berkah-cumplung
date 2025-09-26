import { AuthController } from "./../controllers/auth.controller";
import express from "express";

const authRoute = express.Router();

authRoute.post("/auth/register", AuthController.register);
authRoute.post("/auth/login/", AuthController.loginUser);
authRoute.post("/auth/forgot-password", AuthController.forgotPassword);

export default authRoute;
