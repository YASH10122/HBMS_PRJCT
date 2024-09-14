const express = require("express");
const app = express();

const mongoose = require("mongoose");
const doeenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());
// app.use(express.static("public"));

app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server running on port sucessfully`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
