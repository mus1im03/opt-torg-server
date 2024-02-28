const mongoose = require("mongoose");

const productSchema = mongoose.Schema({ 
  name: String,
  price: String,
  left: Number,
  image: String,
  categoryId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;