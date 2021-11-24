const mongoose = require('mongoose');

const empolyeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    productImage: { type: String, required: true }
});

module.exports = mongoose.model('Product', empolyeeSchema);