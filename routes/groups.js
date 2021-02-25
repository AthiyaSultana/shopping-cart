var express = require('express');
var router = express.Router();
const Groups = require('../models/groups');
const Products = require('../models/products');
const _ = require("lodash");
// const Categories = require('../models/categories');
var ObjectId = require('mongodb').ObjectID;
const categories = require('../models/categories');
const { MethodNotAllowed } = require('http-errors');
/* GET Active groups data. */
router.get('/', async function(req, res, next) {
  try {
    console.log('Groups', Groups);
    const activeGroupData = await Groups.find({
        isactive: true,
    },(err,data) =>{
      if(err){
        console.log('error', err);
        throw err;
  
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
/* To save  data in groups collection*/
router.post('/saveGroup', async function(req, res, next) {
    try {
      const group = new Groups(req.body);
    console.log(' before group', group) ;
        await group.save((err, group) => {
          if (err) {
             console.error(err);
             throw err;
          };
          console.log(group + " group in async");
          res.status(200).send(group);
        });
    } catch (e) {
      res.status(500).send({message:e.message || 'Internal server error'})
    }

});
/**Api to Get all Active products grouped with categories(only active with name and description). */
router.get('/:groupId/products', async function(req, res, next) {
  try {
    console.log('groupid',req.params.groupId );
  let finalData = await categories.aggregate([
    {
      "$match": {
        "groupId": ObjectId(req.params.groupId),
        "isactive": true
      }
    },
    {
        $lookup:{
            from: "products", 
            localField:"_id",     
            foreignField: "categoryId",
            as: "products"
        }
    },
    {$unwind:'$products'},
    {
      $match:{
         "products.isactive": true
      }
     },
    {   
        $project:{
          _id:0,
            productName:"$products.name",
            description:"$products.description",
            category_name:"$name",
            category_description:"$description",
            category_id:"$_id"
        } 
    }
   
]);
  let groupByCategory = _.groupBy(finalData, "category_name");
  res.status(200).send(groupByCategory);
  } catch (err) {
    console.log(err, "err while getting active groups");
    res.status(500).send({
      message:
        err.message || "Error while fetching data",
    });
  }
});
module.exports = router;
