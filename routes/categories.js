var express = require('express');
var router = express.Router();
const Categories = require('../models/categories');
var ObjectId = require('mongodb').ObjectID;
/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    console.log('Groups', Groups);
    const activeGroupData = await Groups.find({
        isactive: true,
    },(err,data) =>{
      if(err){
        console.log('error', err);
      }
    });
    console.log(activeGroupData, "activeGroupData");
    res.status(200).send(activeGroupData);
  } catch (err) {
    console.log(err, "err while getting active groups");
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving active groups.",
    });
  }
});
router.post('/saveCategory', async function(req, res, next) {
    try {
      const category = new Categories();
    console.log(' before group', category) ;
    category.name = "fashion";
    category.description = "another fashion category";
    category.isactive = true;
    category.groupId = ObjectId("6035ffb47e94043a80657e7d");
      console.log(' after category', category) ;
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
