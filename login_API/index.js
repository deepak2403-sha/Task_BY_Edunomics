const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const AuthRoute = require("./api/routes/user");

mongoose.connect('mongodb://localhost:27017/testDB').then(() => {
  console.log("DB Conntected");
})
  .catch(err => console.log(err));

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));
app.listen(8000, () => {
  console.log("Server is up at 8000");
});
app.use('/api', AuthRoute);