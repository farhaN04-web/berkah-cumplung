import { logger } from "./../utils/logger.util";
import { ResponseError } from "./../utils/response.util";
import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import { ZodError } from "zod";

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    logger.warn(`Validation Error: ${JSON.stringify(error.errors)}`, {
      path: req.path,
      method: req.method,
      ip: req.ip,
    });

    res.status(400).json({
      status: "error",
      code: 400,
      message: "Validation Error",
      errors: error.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      })),
    });
  } else if (error instanceof ResponseError) {
    logger.warn(`Response Error: ${error.message}`, {
      status: error.status,
      code: error.code,
      path: req.path,
      method: req.method,
      ip: req.ip,
    });

    res.status(error.code).json({
      status: error.status,
      code: error.code,
      message: error.message,
    });
  } else if (error instanceof MulterError) {
    logger.error(`File Upload Error: ${error.message}`, {
      path: req.path,
      method: req.method,
      ip: req.ip,
    });

    res.status(400).json({
      status: "error",
      code: 400,
      message: "File Upload Error",
      error: error.message,
    });
  } else {
    logger.error(`Internal Server Error: ${error.message}`, {
      path: req.path,
      method: req.method,
      ip: req.ip,
      stack: error.stack, // Include error stack trace
    });

    res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};
