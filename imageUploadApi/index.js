const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const empolyeeRoutes = require("./api/routes/empolyee");

mongoose.connect('mongodb://localhost:27017/imageDB').then(() => {
  console.log("DB Conntected");
})
.catch(err => console.log(err));
  
app.use(morgan("dev"));
// app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/empolyee", empolyeeRoutes);

app.listen(8000, () => {
    console.log("Server is up at 8000");
})