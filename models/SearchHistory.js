const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema({
  url: { type: String, required: true },
  summary: { type: String, required: true },
  fullContent: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SearchHistory", searchHistorySchema);
