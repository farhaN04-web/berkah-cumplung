import multer, { StorageEngine, FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

// Save Images Function
const imageStorage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "storage/images/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Ekstensi file
    cb(null, `image-${uniqueSuffix}${ext}`); // Nama file baru
  },
});

// Filter rules for images
const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;
  const allowedExt = [".jpg", ".jpeg", ".png", ".gif"];
  const allowedMime = ["image/jpeg", "image/png", "image/gif"];
  if (allowedExt.includes(ext) && allowedMime.includes(mime)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPG, PNG, GIF) are allowed to upload!"));
  }
};

// Middleware functions
export const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // Limit file size to 3MB
}).single("image"); // Single image upload