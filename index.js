
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("./config/mongoose");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-authentication");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/", require("./routes"));

app.get('/',(req,res)=>res.send('<h1>Bookstore api</h1> signup to continue'))
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});

