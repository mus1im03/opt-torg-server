const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  user: String,
  totalCash: String,
  date: String,
  paid: { type: Boolean, default: false },
  products: [
    {
      productName: String,
      amount: String,
      price: String,
    },
  ],
});

const Cart = mongoose.model("Cart", cartItemSchema);

module.exports = Cart;