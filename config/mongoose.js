const mongoose = require("mongoose");
// const env = require("./enviorment");

mongoose.connect("mongodb+srv://Prateeksha:prateeksha0209@cluster0.yl8yu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
//   `mongodb://localhost/${process.env.db}`);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to DB");
});

module.exports = db;
