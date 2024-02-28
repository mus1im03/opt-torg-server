const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  totalCash: String,
  products: [
    {
      productName: String, // изменено с productId на productName
      amount: String,
    },
  ],
});

const Cart = mongoose.model("Cart", cartItemSchema);

module.exports = Cart;