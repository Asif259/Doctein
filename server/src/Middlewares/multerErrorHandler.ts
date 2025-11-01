import { Request, Response, NextFunction } from "express";
import multer from "multer";

export const multerErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum file size is 1MB.",
        data: "File size exceeds the limit of 1MB",
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "Too many files uploaded.",
        data: "File count exceeds the limit",
      });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        success: false,
        message: "Unexpected file field.",
        data: "Unexpected file field in the request",
      });
    }
    // Handle other multer errors
    return res.status(400).json({
      success: false,
      message: err.message || "File upload error occurred",
      data: err.message,
    });
  }

  // Handle file filter errors
  if (err.message) {
    if (err.message.includes("Only .jpg, .jpeg and .png files are allowed")) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Only .jpg, .jpeg and .png files are allowed.",
        data: err.message,
      });
    }
  }

  // Pass other errors to the next error handler
  next(err);
};

