const axios = require("axios");
const scrapeWebsite = require("./scraper");

const runAgent = async (url) => {
  const htmlContent = await scrapeWebsite(url);

  const prompt = `
Bạn là một trợ lý AI. Hãy đọc nội dung HTML dưới đây, trích xuất và tóm tắt phần nội dung chính của trang (văn bản, bài viết, thông tin quan trọng).
Tóm tắt một cách tự nhiên, dễ hiểu như đang kể lại cho người khác.
Dưới đây là nội dung HTML:
${htmlContent}
  `;

  const response = await axios({
    method: "post",
    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
    params: { key: process.env.GEMINI_API_KEY },
    data: {
      contents: [{ parts: [{ text: prompt }] }],
    },
  });

  const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Không có kết quả.";
  return text;
};

module.exports = { runAgent };
