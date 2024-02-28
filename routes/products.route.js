const { Router } = require('express')
const { productsController } = require('../controllers/products.controller')
const imgMiddleware = require('../models/middlewares/img.middleware')

const router = Router();

router.get('/product', productsController.getProducts);
router.post('/product', imgMiddleware.single('img'), productsController.postProduct);
router.delete('/product/:id', productsController.deleteProduct);
router.patch('/product/:id', productsController.patchProduct);

module.exports = router;