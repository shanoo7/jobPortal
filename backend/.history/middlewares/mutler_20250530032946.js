// import multer from "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("file");


// In your multer.middleware.js (or wherever you configure Multer)
import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// For handling multiple files with specific field names
export const uploadFiles = upload.fields([
  { name: 'file', maxCount: 1 },    // For profile photo
  { name: 'resume', maxCount: 1 }   // For resume
]);

export default upload;