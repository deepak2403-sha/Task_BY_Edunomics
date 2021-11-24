const express = require('express');
const router = express.Router();
const User = require("../models/user");

router.post("/", (req, res, next) => {
    let user = new User({
        email = req.body.email,
        senior_email = req.body.senior_email
    });
    user.save().then(() => {
        res.json({
            message:"user added"
        })
    })
    .catch((err) => {
        res.json({
        message :'error occured'
    })
})
    
})

