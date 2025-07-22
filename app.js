const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const agentRoute = require("./routes/agent");
const agentChatRoute = require("./routes/agent-chat");
const agentReportRoute = require("./routes/report");

app.use("/api", agentRoute);
app.use("/api", agentChatRoute);
app.use("/api", agentReportRoute);

app.listen(5000, () => console.log("Server listening on port 5000"));
