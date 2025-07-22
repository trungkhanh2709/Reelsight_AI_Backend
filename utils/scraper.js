const puppeteer = require("puppeteer");

const scrapeWebsite = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    const content = await page.content();
    await browser.close();

    const cheerio = require("cheerio");
    const $ = cheerio.load(content);
    const text = $("body").text();
    return text.replace(/\s+/g, " ").trim().slice(0, 15000);
  } catch (err) {
    console.error("Scrape error:", err?.message || err);
    return "Không thể tải trang web.";
  }
};

module.exports = scrapeWebsite;
