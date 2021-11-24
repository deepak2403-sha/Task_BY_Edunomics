require('dotenv').config();
const twilio = require('twilio');
const sgmail = require('@sendgrid/mail');

const apiKey = `${process.env.SENDGRID_API_KEY}`;
const accountSid = `${process.env.accountSid}`;
const authToken = `${process.env.authToken}`;
console.log(apiKey);
console.log(authToken);
sgmail.setApiKey(apiKey);

const User = require('./api/models/user');
let semail = User.findOne({ email: req.body.email });
let femail = User.findOne({ senior_email: req.body.senior_email });
const message = {
  to: femail,
  from: semail,
  subject: 'Image uploaded',
  text: 'Image uploaded',
  html: 'Image uploaded'
};

sgmail.send(message)
  .then((response) => console.log('response'))
  .catch((err) => console.log(err.message));