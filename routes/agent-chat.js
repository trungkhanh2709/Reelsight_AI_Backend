// backend/routes/agent-chat.js
const express = require("express");
const router = express.Router();
const { GeminiChatAgent } = require("../utils/llm");

router.post("/agent-chat", async (req, res) => {
  const { userInput, fullContent } = req.body;

  const prompt = `
Bạn là một trợ lý AI.
Dưới đây là nội dung gốc của một trang web mà người dùng vừa đọc.
--- NỘI DUNG TRANG WEB ---
${fullContent}
--------------------------

Người dùng hỏi: "${userInput}"
Hãy trả lời chi tiết và thân thiện như một trợ lý.
Cuối cùng, hãy đề xuất một hành động tiếp theo phù hợp. (ví dụ: “Bạn có muốn tôi gửi nội dung này qua email không?”)
`;

  try {
const reply = await GeminiChatAgent(prompt);
    res.json({ response: reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Agent error." });
  }
});


module.exports = router;
