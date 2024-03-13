const express = require('express');
const { cartsController } = require('../controllers/carts.controller');

const router = express.Router();
router.get('/cart', cartsController.getCart);
router.post('/cart/add', cartsController.postCart);
router.delete('/cart/remove/:productId', cartsController.deleteCartItem);
// router.patch('/cart/inc/:productId', cartsController.inc);
// router.patch('/cart/dec/:productId', cartsController.dec);

module.exports = router;