if (process.env.MONGO_URI !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const IndexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("running good!"));

app.use("/", IndexRouter);

app.listen(process.env.PORT || 3000);
