import multer from "multer";

// Multer setup — store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
