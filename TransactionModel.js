const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
  d_id: Number,
  gold_deliver: Number,
  formula: Number,
  gold_return: Number,
  due: Number,
});

const Transaction=mongoose.model("Transaction",TransactionSchema);
module.exports = Transaction;
