const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer");

const scrapeWebsite = async (url) => {
  let browser = null;
  try {
    const executablePath = await chromium.executablePath || '/usr/bin/google-chrome'; // fallback cho local
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    const content = await page.content();
    const $ = require("cheerio").load(content);
    const text = $("body").text();
    return text.replace(/\s+/g, " ").trim().slice(0, 15000);
  } catch (err) {
    console.error("Scrape error:", err?.message || err);
    return "Không thể tải trang web.";
  } finally {
    if (browser) await browser.close();
  }
};

module.exports = scrapeWebsite;
