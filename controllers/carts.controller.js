const Cart = require("../models/Cart.model");

module.exports.cartsController = {
  getCart: async (req, res) => {
    try {
      const cart = await Cart.find();
      res.json(cart);
    } catch (error) {
      return res.status(500).json({ error: 'Не удалось получить корзину', message: error.message });
    }
  },

  postCart: async (req, res) => {
    try {
      const { products, totalCash, user, date, paid } = req.body;

      if (!products || !Array.isArray(products)) {
        return res.status(400).json({ error: 'Недопустимые входные данные' });
      }

      const cart = await Cart.create({ products, totalCash, user, date, paid });
      res.json(cart);
    } catch (error) {
      return res.status(500).json({ error: 'Не удалось создать корзину', message: error.message });
    }
  },

  deleteCartItem: async (req, res) => {
    try {
      const { productName } = req.params;
  
      if (!productName) {
        return res.status(400).json({ error: 'Недопустимые входные данные для productName' });
      }
  
      const cart = await Cart.findOneAndUpdate(
        {},
        { $pull: { products: { productName } } },
        { new: true }
      );
  
      if (!cart) {
        return res.status(404).json({ error: 'Товар не найден в корзине' });
      }
  
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Не удалось удалить товар из корзины', message: error.message });
    }
  },
};