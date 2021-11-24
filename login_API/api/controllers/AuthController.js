const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { hash } = require("bcrypt");
const user = require("../models/user");
const jwt = require("jsonwebtoken")

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            res.json({
                error : err
            })
        }
        let user = new User({
            email: req.body.email,
            senior_email: req.body.senior_email,
            password: hash
        })
        user.save()
            .then((user) => {
                res.json({
                message :'user added'
                })
                  
            })
            .catch((err) => {
                res.json({
                message :'error occured'
            })
        })
    })
}

const login = (req, res, next) => {
    let username = req.body.email;
    let password = req.body.password;
    User.findOne({ email: username })
        .then((user) => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error : err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({
                            email : user.email
                        }, 'verySecretValue', { expiresIn: '1h' })
                        res.json({
                            message: 'Login',
                            token
                        })
                    } else {
                        res.json({
                            message : "Password doesn't match"
                        })
                    }
                })
            } else {
                res.json({
                    message :'No user found'
                })
        }
    })
}

module.exports = {
    register, login
}