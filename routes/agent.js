const express = require("express");
const router = express.Router();
const { GeminiChatAgent } = require("../utils/llm");
const scrapeWebsite = require("../utils/scraper");

router.get("/history", async (req, res) => {
  try {
    const history = await SearchHistory.find().sort({ createdAt: -1 }).limit(20);
    res.json(history);
  } catch (err) {
    console.error("Get history error:", err);
    res.status(500).json({ error: "Failed to fetch history." });
  }
});

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
