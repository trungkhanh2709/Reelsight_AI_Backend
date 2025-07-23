const express = require("express");
const router = express.Router();
const { GeminiChatAgent } = require("../utils/llm");
const { scrapeWebsite } = require("../utils/scraper");


router.post("/agent", async (req, res) => {
  const { url } = req.body;

  try {
    const htmlContent = await scrapeWebsite(url);
    const summary = await GeminiChatAgent(htmlContent); //

    
    res.json({ summary, fullContent: htmlContent });
  } catch (err) {
    console.error("Agent error:", err);
    res.status(500).json({ error: "Agent failed to process." });
  }
});
module.exports = router;
