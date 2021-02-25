var express = require('express');
var router = express.Router();
const Categories = require('../models/categories');
var ObjectId = require('mongodb').ObjectID;

/* To save the category in db */
router.post('/saveCategory', async function(req, res, next) {
    try {
      const category = new Categories(req.body);
        await category.save((err, category) => {
          if (err) return console.error(err);
          console.log(category + " category in async");
          res.status(200).send(category);
        });
    } catch (e) {
      throw e;
    }

});

module.exports = router;
