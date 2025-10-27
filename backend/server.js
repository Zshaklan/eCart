// Start Server
import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config({ debug: true });

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
