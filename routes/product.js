var express = require('express');
var router = express.Router();
var product_controller = require('../controllers/product');
const auth = require('./auth');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);

router.get('/get',product_controller.product_get);
router.post('/create',auth.required,product_controller.product_create);

router.get('/:id', product_controller.product_details);

router.put('/:id/update',auth.required, product_controller.product_update);

router.delete('/:id/delete',auth.required, product_controller.product_delete);


module.exports = router;