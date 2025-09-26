import { CategoryController } from "./../../controllers/category.controller";
import { ProductController } from "./../../controllers/product.controller";
import express from "express";

export const webroute = express.Router();

webroute.get("/products", ProductController.getAll);
webroute.get("/products/:id", ProductController.getById);
webroute.get("/categories", CategoryController.getAll);

export default webroute;
