const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({storage: storage});
const Product = require("../models/empolyee");

router.post("/", upload.single('productImage'), (req, res, next) => {
  console.log(req.file);
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      productImage: req.file.path 
    });
    product
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Image uploaded successfully",
          createdProduct: {
              name: result.name,
              email: result.email,
              _id: result._id,
              request: {
                  type: 'GET',
                  url: "http://localhost:3000/products/" + result._id
              }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});
  

module.exports = router;
  