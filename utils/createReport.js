// utils/report.js
const PDFDocument = require('pdfkit');
const fs = require('fs');

const createReport = (data, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(16).text('Báo cáo AI Agent', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Tóm tắt: ${data.summary}`);
    doc.moveDown();

    doc.text(`Nội dung gốc: ${data.fullContent}`);

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};

module.exports = createReport;
