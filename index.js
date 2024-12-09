const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Dokan = require("./DokanModel");
const Transaction = require("./TransactionModel");

const app = express();

dotenv.config({
  path: "./config.env",
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const db = process.env.Mongo_uri.replace(
  "<db_password>",
  process.env.Mongo_pass
);
mongoose.connect(db).then(() => console.log("database connected!!"));

app.get("/", async (req, res) => {
  res.send("Hello");
});

//-----get Dokan data

app.get("/dokan", async (req, res) => {
  try {
    const data = await Dokan.find();
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
    });
  }
});

//------create new dokan data
app.post("/dokan", async (req, res) => {
  try {
    const { name, id, phone } = req.body;
    const dokan = await Dokan.create({
      name,
      id,
      phone,
    });
    res.status(200).json({
      status: "sucess",
      data: dokan,
    });
  } catch (err) {
    console.log(err);
    response.status(404).json({
      error: err,
    });
  }
});

//-----get particular dokan

app.get("/dokan/:id", async (req, res) => {
  try {
    const data = await Dokan.findOne({ id: req.params.id });
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
    });
  }
});

//-------get transactions
app.get("/dokan/:id/transaction", async (req, res) => {
  try {
    const data = await Transaction.find({ d_id: req.params.id });
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
    });
  }
});

//--------create a new transaction
app.post("/dokan/:id/transaction", async (req, res) => {
  try {
    const { d_id, gold_deliver, formula, gold_return, due } = req.body;
    const transaction = await Transaction.create({
      d_id,
      gold_deliver,
      formula,
      gold_return,
      due,
    });
    res.status(200).json({
      status: "success",
      data: transaction,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log("server started");
});
