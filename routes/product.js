var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var product_controller = require('../controllers/product');
const auth = require('./auth');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);


router.post('/create',auth.required, (req, res) =>{
    var product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    });
});

router.get('/:id', product_controller.product_details);

router.put('/:id/update', product_controller.product_update);

router.delete('/:id/delete', product_controller.product_delete);


module.exports = router;