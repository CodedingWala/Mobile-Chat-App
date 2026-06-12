import {connectDB} from "./src/config/database"
import app from "./src/app"
import {createServer} from "http"
import { initializeSocket } from "./src/utils/socket";
const httpServer=createServer(app)
const PORT = process.env.PORT || 3000;
initializeSocket(httpServer)



connectDB()
  .then(() => {
   httpServer.listen(PORT, () => {
      console.log("Server is running on PORT:", PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });