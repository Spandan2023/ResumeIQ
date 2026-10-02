import dns from "node:dns";

// ----------------------------------
// Temporary Node.js DNS workaround
// ----------------------------------

dns.setServers([
  "1.1.1.1",
  "1.0.0.1",
]);

import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 7070;

// ----------------------------------
// Start ResumeIQ server
// ----------------------------------

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Start Express after MongoDB connects
    app.listen(PORT, () => {
      console.log(`ResumeIQ server is running on port ${PORT}`);
      console.log(`API URL: http://localhost:${PORT}`);
      console.log(
        `Health Check: http://localhost:${PORT}/api/health`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start ResumeIQ server:",
      error.message
    );

    process.exit(1);
  }
};

startServer();