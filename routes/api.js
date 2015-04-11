var express = require('express');
var router = express.Router();

var Product = require('../models/product');

router.route('/products')

  .get(function(req, res, next) {
    Product.find(function (err, products) {
      if (err)
        return next(err);
      res.json(products);
    });
  })

  .post(function(req, res, next) {

    var product = new Product();

    product.name = req.body.name;
    product.price = req.body.price;

    product.save(function(err) {
      if (err)
        return next(err);
      res.json({ message: 'Product created!' });
    });

  });


router.route('/products/:product_id')

  .get(function(req, res, next) {
    Product.findById(req.params.product_id, function(err, product) {
      if (err)
        return next(err);
      res.json(product);
    });
  })

  .put(function(req, res, next) {
    Product.findById(req.params.product_id, function(err, product) {
      if (err)
        return next(err);

      product.name = req.body.name;
      product.price = req.body.price;

      product.save(function(err) {
        if (err)
          return next(err);

        res.json({ message: 'product updated!' });
      });

    });
  })

  .delete(function(req, res, next) {
    Product.remove({ _id: req.params.product_id }, function(err, product) {
      if (err)
        return next(err);
      res.json({ message: 'Successfully deleted' });
    });
  });

module.exports = router;
