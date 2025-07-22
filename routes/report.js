// routes/report.js
const express = require("express");
const createReport = require("../utils/createReport");
const sendReportEmail = require("../utils/mailer");
const router = express.Router();

router.post("/send-report", async (req, res) => {
  const { summary, fullContent, email } = req.body;

  try {
    const filePath = `./report-${Date.now()}.pdf`;
    await createReport({ summary, fullContent }, filePath);
    await sendReportEmail(email, "Báo cáo AI Agent", "Vui lòng xem tệp đính kèm.", filePath);

    res.json({ success: true, message: "Đã gửi email thành công!" });
  } catch (err) {
    console.error("Lỗi gửi báo cáo:", err);
    res.status(500).json({ error: "Gửi báo cáo thất bại." });
  }
});

module.exports = router;
