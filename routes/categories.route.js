const { Router } = require('express')
const { categoriesController } = require('../controllers/categories.controller')
const imgMiddleware = require('../models/middlewares/img.middleware')

const router = Router();

router.get('/category', categoriesController.getCategories);
router.post('/category', imgMiddleware.single('img'), categoriesController.postCategory);
router.delete('/category/:id', categoriesController.deleteCategory);

module.exports = router;