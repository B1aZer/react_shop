var express = require('express');
var router = express.Router();

var Product = require('../models/product');

router.route('/products')

  .get(function(req, res, next) {
    Product.find(function (err, products) {
      if (err)
        res.send(err);
      res.json(products);
    });
  })

  .post(function(req, res) {

    var product = new Product();
    product.text = req.body.text;

    product.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Product created!' });
    });

  });


router.route('/products/:product_id')

  .get(function(req, res) {
    Product.findById(req.params.product_id, function(err, product) {
      if (err)
        res.send(err);
      res.json(product);
    });
  })

  .put(function(req, res) {
    Product.findById(req.params.product_id, function(err, product) {
      if (err)
        res.send(err);

      product.text = req.body.text;

      product.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'product updated!' });
      });

    });
  })

  .delete(function(req, res) {
    Product.remove({ _id: req.params.product_id }, function(err, product) {
      if (err)
        res.send(err);
      res.json({ message: 'Successfully deleted' });
    });
  });

module.exports = router;
