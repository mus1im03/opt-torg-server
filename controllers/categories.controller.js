const Category = require("../models/Category.model");

module.exports.categoriesController = {
  getCategories: async (req, res) => {
    const categories = await Category.find();

    res.json(categories);
  },
  

  postCategory: async (req, res) => {
    const { title } = req.body;

    try {
      const category = await Category.create({ title });
      await res.json(category);
    } catch (e) {
      return res.status(401).json(e.toString());
    }
  },


  deleteCategory: async (req, res) => {
    const { id } = req.params;

    try {
      const category = await Category.findById(id);

      if (category.user.toString() === req.user.id) {
        await Category.findByIdAndRemove(id);
        
         return res.json("deleted");
      }

      return res.status(401).json("Ошибка нет доступа");
    } catch (e) {
      return res.json("Ошибка: " + e.toString());
    }
  },

};