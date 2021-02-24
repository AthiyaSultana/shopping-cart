require('dotenv').config();
const uri = process.env.ATLAS_URI;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
console.log('uri', uri)
// var connection = mongoose.createConnection(uri);
var connection = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, dbName: "shoppingcart"}).then(
        (data) => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
          console.log('DB connected succesfully');
        },
        err => { /** handle initial connection error */
          console.log('error while connecting to db', err);
        }
      );
exports.mongoose = mongoose;
exports.Schema = Schema;