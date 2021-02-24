var mong = require('../db');
var Schema = mong.mongoose.Schema;
 
var categorySchema = new Schema({
    name: {type: String},               
    description: {type: String},               
    isactive: {type: Boolean},
    groupId: {type: Schema.Types.ObjectId, ref: 'Groups'}
});
 

module.exports = mong.mongoose.model('Categories', categorySchema);