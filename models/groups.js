// var mong = require('../db');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var groupSchema = new Schema({
    name: {type: String},               
    description: {type: String},               
    isactive: {type: Boolean}
});
module.exports = mongoose.model('Groups', groupSchema);
// export default mongoose.model('User', userSchema);