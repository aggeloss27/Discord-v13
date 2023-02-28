const {mongoose,model, Schema} = require('mongoose');

module.exports = model('inventory', new Schema({
  userID: String,
  Inventory: Object
}))