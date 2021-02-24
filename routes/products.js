var express = require('express');
var router = express.Router();
const Products = require('../models/products');
var ObjectId = require('mongodb').ObjectID;
/* Api to get the all products */
router.get('/', async function(req, res, next) {
  try {
    const productsData = await Products.find();
    console.log(productsData, "productsData");
    res.status(200).send(productsData);
  } catch (err) {
    console.log(err, "error while getting products");
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving products.",
    });
  }
});
/* Api to save new prodct*/
router.post('/saveProducts', async function(req, res, next) {
    try {
        console.log('req.body', req.body);
      const product = new Products(req.body);
    // console.log(' before group', product) ;
    // product.name = "Shervani";
    // product.description = "Cream color";
    // product.isactive = false;
    // product.categoryId = ObjectId("603603802c9fee3cd864068b");
    //   console.log(' after product', product) ;
        await product.save((err, product) => {
          if (err) {
            console.error(err);
            throw err;
            };
          console.log(product + " product in async");
          res.status(200).send(product);
        });
    } catch (e) {
        res.status(500).send({message:e.message || 'Internal server error'})
    }

});
/*API to update isactive column  value for all the  products.*/
router.post("/", async (req, res) => {
    try {
      await Products.updateMany({}, { $set: { isactive: true } });
      res.status(200).send({message:"Succesfully updated all records"});
    } catch (err) {
      console.log(err, "err while updating products");
      res.status(500).send({
        message: err.message || "err while updating products",
      });
    }
  });
/*Api to get the particular product based on ID*/
router.get('/:id', async function(req, res, next) {
    try {
      console.log('req', req.params.id);
      const products = await Products.find({
          isactive: true,
      },(err,data) =>{
        if(err){
        throw err
        }
      });
      console.log(products, "products");
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    }
  });
/*Api to update individual product name column based on product id*/
router.put("/:id", async (req, res) => {
    const { productName } = req.body;
    const productId = req.params.id;
    try {
     await Products.findByIdAndUpdate(productId, { name: productName }, 
                            function (err, data) { 
    if (err){ 
       throw err;
    } 
    res.status(200).send({ message: "Updated successfully" });
}); 
    } catch (err) {
      console.log(err, "Error occurred while updating product name");
      res.status(500).send({
        message: err.message || "Error occurred while updating product name",
      });
    }
  });  

  /*Api to update individual product name column based on product id*/
router.delete("/:id", async (req, res) => {
    const productId = req.params.id;
    try {
     await Products.findByIdAndDelete(productId,
                            function (err, data) { 
    if (err){ 
       throw err;
    } 
    res.status(200).send({ message: "Deleted successfully" });
}); 
    } catch (err) {
      console.log(err, "Error occurred while deleting the product");
      res.status(500).send({
        message: err.message || "Error occurred while deleting the product",
      });
    }
  });  
module.exports = router;
