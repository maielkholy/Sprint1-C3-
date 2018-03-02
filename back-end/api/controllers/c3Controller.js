var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  c3 = mongoose.model('c3');

module.exports.getProduct = function(req, res, next) {
  if (!Validations.isObjectId(req.params.productId)) {
    return res.status(422).json({
      err: null,
      msg: 'productId parameter must be a valid ObjectId.',
      data: null
    });
  }
  c3.findById(req.params.productId).exec(function(err, c3) {
    if (err) {
      return next(err);
    }
    if (!c3) {
      return res
        .status(404)
        .json({ err: null, msg: 'Product not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Product retrieved successfully.',
      data: c3
    });
  });
};

module.exports.getProducts = function(req, res, next) {
  c3.find({}).exec(function(err, c3s) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Products retrieved successfully.',
      data: c3s
    });
  });
};

module.exports.getProductsBelowPrice = function(req, res, next) {
  if (!Validations.isNumber(req.params.price)) {
    return res.status(422).json({
      err: null,
      msg: 'price parameter must be a valid number.',
      data: null
    });
  }
  c3.find({
    price: {
      $lt: req.params.price
    }
  }).exec(function(err, c3s) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg:
        'Products priced below ' +
        req.params.price +
        ' retrieved successfully.',
      data: c3s
    });
  });
};

module.exports.createProduct = function(req, res, next) {
  var valid =
    req.body.name &&
    Validations.isString(req.body.name) &&
    req.body.price &&
    Validations.isNumber(req.body.price)&&
    req.body.seller &&
    Validations.isString(req.body.seller)&&
    req.body.component &&
    Validations.isString(req.body.component);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String) and price(Number) are required fields.',
      data: null
    });
  }
  // Security Check
  delete req.body.createdAt;
  delete req.body.updatedAt;

  c3.create(req.body, function(err, c3) {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      err: null,
      msg: 'Product was created successfully.',
      data: c3
    });
  });
};

module.exports.updateProduct = function(req, res, next) {
  if (!Validations.isObjectId(req.params.productId)) {
    return res.status(422).json({
      err: null,
      msg: 'productId parameter must be a valid ObjectId.',
      data: null
    });
  }
  var valid =
    req.body.name &&
    Validations.isString(req.body.name) &&
    req.body.price &&
    Validations.isNumber(req.body.price);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String) and price(Number) are required fields.',
      data: null
    });
  }
  // Security Check
  delete req.body.createdAt;
  req.body.updatedAt = moment().toDate();

  c3.findByIdAndUpdate(
    req.params.productId,
    {
      $set: req.body
    },
    { new: true }
  ).exec(function(err, updatedProduct) {
    if (err) {
      return next(err);
    }
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ err: null, msg: 'Product not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Product was updated successfully.',
      data: updatedProduct
    });
  });
};

module.exports.deleteProduct = function(req, res, next) {
  if (!Validations.isObjectId(req.params.productId)) {
    return res.status(422).json({
      err: null,
      msg: 'productId parameter must be a valid ObjectId.',
      data: null
    });
  }
  c3.findByIdAndRemove(req.params.productId).exec(function(
    err,
    deletedProduct
  ) {
    if (err) {
      return next(err);
    }
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ err: null, msg: 'Product not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Product was deleted successfully.',
      data: deletedProduct
    });
  });
};
