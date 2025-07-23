const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Load API key từ file .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function GeminiChatAgent(htmlContent) {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

  const prompt = `
    You are an intelligent AI assistant. Please read and summarize the following HTML content for a general user (only extract the main content):
    ${htmlContent}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    // Kiểm tra lỗi GoogleGenerativeAI cụ thể
    if (error.message.includes("API key not valid")) {
      return "Error: Invalid API key";
    }

    if (error.message.includes("Too Many Requests")) {
      return "Error: You have exceeded the free daily API usage limit. Please try again tomorrow or upgrade your Google Cloud account.";
    }

    // Lỗi không xác định
    console.error("Error when calling Gemini API:", error);
    return "An error occurred while processing the content. Please try again later.";
  }
}

module.exports = { GeminiChatAgent };
