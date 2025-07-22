// backend/routes/agent-chat.js
const express = require("express");
const router = express.Router();
const { GeminiChatAgent } = require("../utils/llm");

// /routes/agentChat.js
router.post("/agent-chat", async (req, res) => {
  const { messages, fullContent } = req.body;

  try {
    const fullPrompt = messages
      .map((m) => `${m.role === "user" ? "User" : "Agent"}: ${m.content}`)
      .join("\n");

    const finalPrompt = `Dưới đây là nội dung trang web:\n${fullContent}\n\nLịch sử hội thoại:\n${fullPrompt}\n\nAgent hãy trả lời câu hỏi mới nhất của User.`;

    const response = await GeminiChatAgent(finalPrompt);

    res.json({ response });
  } catch (err) {
    console.error("Lỗi xử lý chat:", err);
    res.status(500).json({ error: "Lỗi Agent." });
  }
});




module.exports = router;
