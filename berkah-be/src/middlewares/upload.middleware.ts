import { NextFunction, Request, Response } from "express";

export function validateUploadHeaders(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const contentType = req.headers["content-type"] || "";
  const contentLength = parseInt(req.headers["content-length"] || "0", 10);

  // denied if not multipart/form-data
  if (!contentType.startsWith("multipart/form-data")) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Invalid Content-Type",
    });

    return;
  }

  // denied if content length is too small (just boundary)
  if (contentLength < 100) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Empty multipart/form-data request is not allowed",
    });

    return;
  }

  // denied if content length is more than 3MB
  if (contentLength > 3 * 1024 * 1024) {
    res.status(413).json({
      status: "error",
      code: 413,
      message: "File size exceeds the limit of 3MB",
    });

    return;
  }

  next();
}
