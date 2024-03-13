const Cart = require("../models/Cart.model");

module.exports.cartsController = {
  getCart: async (req, res) => {
    try {
      const cart = await Cart.find();
      res.json(cart);
    } catch (e) {
      return res.status(500).json({ error: 'Не удалось получить корзину', message: e.message });
    }
  },

  postCart: async (req, res) => {
    try {
      const { products, totalCash, user, date, paid, } = req.body;

      if (!products || !Array.isArray(products)) {
        return res.status(400).json({ error: 'Недопустимые входные данные' });
      }

      const cart = await Cart.create({ products, totalCash, user, date, paid, });
      res.json(cart);
    } catch (e) {
      return res.status(500).json({ error: 'Не удалось создать корзину', message: e.message });
    }
  },

  deleteCartItem: async (req, res) => {
    try {
      const { productName } = req.params;
  
      if (!productName) {
        return res.status(400).json({ error: 'Недопустимые входные данные для productName' });
      }
  
      const cart = await Cart.findOneAndUpdate(
        { $pull: { products: { productName } } },
        { new: true }
      );
  
      if (!cart) {
        return res.status(404).json({ error: 'Товар не найден в корзине' });
      }
  
      res.json(cart);
    } catch (e) {
      console.error(e); // Логирование ошибок
      res.status(500).json({ error: 'Не удалось удалить товар из корзины', message: e.message });
    }
  },

  // inc: async (req, res) => {
  //   try {
  //     const { productName } = req.params; // изменено с productId на productName
  
  //     if (!productName) {
  //       return res.status(400).json({ error: 'Недопустимые входные данные' });
  //     }
  
  //     const cart = await Cart.findOneAndUpdate(
  //       { "products.productName": productName },
  //       { $inc: { "products.$.amount": 1 } },
  //       { new: true }
  //     );
  
  //     if (!cart) {
  //       return res.status(404).json({ error: 'Корзина или товар не найдены' });
  //     }
  
  //     res.json(cart);
  //   } catch (e) {
  //     return res.status(500).json({ error: 'Не удалось увеличить количество товара', message: e.message });
  //   }
  // },

  // dec: async (req, res) => {
  //   try {
  //     const { productName } = req.params; // изменено с productId на productName
  
  //     if (!productName) {
  //       return res.status(400).json({ error: 'Недопустимые входные данные' });
  //     }
  
  //     const cart = await Cart.findOneAndUpdate(
  //       { "products.productName": productName, "products.amount": { $gt: 0 } },
  //       { $inc: { "products.$.amount": -1 } },
  //       { new: true }
  //     );
  
  //     if (!cart) {
  //       return res.status(404).json({ error: 'Корзина или товар не найдены или количество товара уже минимальное' });
  //     }
  
  //     res.json(cart);
  //   } catch (e) {
  //     return res.status(500).json({ error: 'Не удалось уменьшить количество товара', message: e.message });
  //   }
  // },
};