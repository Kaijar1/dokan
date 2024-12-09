const mongoose = require("mongoose");
const DokanSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  id: {
    type: Number,
    unique: true,
  },
  phone: {
    type: Number,
    unique: true,
  },
});

const Dokan = mongoose.model("Dokan", DokanSchema);
module.exports = Dokan;
