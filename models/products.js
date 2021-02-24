var mong = require('../db');
var Schema = mong.mongoose.Schema;
 
var productsSchema = new Schema({
    name: {type: String},               
    description: {type: String},               
    image_url: {type: String},               
    isactive: {type: Boolean},
    categoryId: {type: Schema.Types.ObjectId, ref: 'Categories'}
});
 

module.exports = mong.mongoose.model('Products', productsSchema);