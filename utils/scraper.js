const axios = require("axios");
const cheerio = require("cheerio");

const scrapeWebsite = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const text = $("body").text();
    return text.replace(/\s+/g, " ").trim().slice(0, 15000); // tránh gửi quá dài
  } catch (err) {
    console.error("Scrape error:", err);
    return "Không thể tải trang web.";
  }
};

module.exports = scrapeWebsite;
