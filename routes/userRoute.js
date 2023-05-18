const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/bookModel');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  Product.find((err, products) => {
    if (err) {
      console.log(err);
    } else {
      res.render('products/index', { products: products });
    }
  });
});

router.get('/new', (req, res) => {
  res.render('products/new');
});

router.post('/', upload.single('image'), (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.file.filename
  });

  product.save((err) => {
    if (err) {
      console.log(err);
    } else {
        console.log("product saved ",product);
      res.redirect('/');
    }
  });
});

module.exports = router;
