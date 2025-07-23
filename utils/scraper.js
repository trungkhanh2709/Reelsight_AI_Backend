// utils/scraper.js
const axios = require("axios");
const cheerio = require("cheerio");

const scrapeWebsite = async (url) => {
  try {
    const res = await axios.get(url, { timeout: 15000 });
    const $ = cheerio.load(res.data);
    const text = $("body").text();
    return text.replace(/\s+/g, " ").trim().slice(0, 15000);
  } catch (err) {
    console.error("Scrape error:", err?.message || err);
    return "Unable to load the website.";
  }
};

// 👇 Đảm bảo export đúng cách
module.exports = { scrapeWebsite };
