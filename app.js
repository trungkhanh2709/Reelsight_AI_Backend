const express = require("express");
const cors = require("cors");
require("dotenv").config();
const puppeteer = require("puppeteer");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.URL_FRONTEND, // ví dụ: "https://reelsightai.vercel.app"
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Import routes
const agentRoute = require("./routes/agent");
const agentChatRoute = require("./routes/agent-chat");

async function startServer() {
  try {
    // Khởi động Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: puppeteer.executablePath(),
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    // Lưu browser vào app.locals để dùng ở router
    app.locals.browser = browser;

    // Mount routes
    app.use("/api", agentRoute);
    app.use("/api", agentChatRoute);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error("Error starting server:", err);
  }
}

startServer();
