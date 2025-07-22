
const express = require("express");
const cors = require("cors");
const { GeminiChatAgent } = require("./utils/llm");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/agent", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Thiếu URL" });

  try {
    const summary = await GeminiChatAgent(url);
    res.json({ summary });
  } catch (err) {
    console.error("Lỗi Agent:", err.message);
    res.status(500).json({ error: "Lỗi khi xử lý trang web." });
  }
});

app.listen(5000, () => console.log("Server listening on port 5000"));