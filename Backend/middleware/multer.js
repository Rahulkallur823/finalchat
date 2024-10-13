import multer from "multer";

// Set up multer storage (in memory)
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

export default upload;
