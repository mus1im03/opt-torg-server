const Product = require("../models/Product.model");

module.exports.productsController = {
  getProducts: async (req, res) => {
    const product = await Product.find();

    res.json(product);
  },
  

  postProduct: async (req, res) => {
    const { name, price, left, image, categoryId } = req.body;

    try {
      const product = await Product.create({ name, price, left, image, categoryId });
      await res.json(product); 
    } catch (e) {
      return res.status(401).json(e.toString());
    }
  },


  deleteProduct: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);

      if (product.user.toString() === req.user.id) {
        await Product.findByIdAndRemove(id);
        
         return res.json("deleted");
      }

      return res.status(401).json("Ошибка нет доступа");
    } catch (e) {
      return res.json("Ошибка: " + e.toString());
    }
  },


  patchProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { name, price, left, image, categoryId, },
      );
      await res.json(product);
    } catch (error) {
      res.json(error);
    }
  },
};