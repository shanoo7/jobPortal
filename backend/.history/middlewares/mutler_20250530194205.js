
import multer from "multer";

const storage = multer.memoryStorage();

// For handling multiple files with specific field names
export const uploadFiles = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
}).fields([
  { name: 'file', maxCount: 1 },    // For profile photo
  { name: 'resume', maxCount: 1 }   // For resume
]);

// Keep the single upload for other routes
export const singleUpload = multer({ storage }).single("file");