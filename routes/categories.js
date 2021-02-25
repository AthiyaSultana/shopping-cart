var express = require('express');
var router = express.Router();
const Categories = require('../models/categories');
var ObjectId = require('mongodb').ObjectID;

/* To save the category in db */
router.post('/saveCategory', async function(req, res, next) {
    try {
      const category = new Categories(req.body);
        await category.save((err, category) => {
          if (err) {
         throw err;
          }
          res.status(200).send(category);
        });
    } catch (e) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while saving category in database.",
          });
    }

});

module.exports = router;
