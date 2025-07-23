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

    const finalPrompt = `Here is the content of the website:\n${fullContent}\n\nConversation history:\n${fullPrompt}\n\nAgent, please answer the user's latest question.`;

    const response = await GeminiChatAgent(finalPrompt);

    res.json({ response });
  } catch (err) {
    console.error("Chat processing error", err);
    res.status(500).json({ error: "Agent error." });
  }
});




module.exports = router;
