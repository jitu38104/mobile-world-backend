const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    info: { type: String, required: true },
    imgName: { type: String, required: true },
    imgPath: { type: String, required: true }
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;