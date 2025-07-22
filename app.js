const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const puppeteer = require("puppeteer");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.URL_FRONTEND, 
    // origin: 'http://localhost:3000', 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const browser = await puppeteer.launch({
  headless: "new", // or true
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
// Import routes
const agentRoute = require("./routes/agent");
const agentChatRoute = require("./routes/agent-chat");

app.use("/api", agentRoute);
app.use("/api", agentChatRoute);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
