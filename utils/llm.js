const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Load key từ .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function GeminiChatAgent(htmlContent) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Bạn là một trợ lý AI thông minh. Hãy đọc và tóm tắt nội dung HTML sau cho người dùng phổ thông (chỉ lấy nội dung chính):
    ${htmlContent}
    `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = { GeminiChatAgent };
