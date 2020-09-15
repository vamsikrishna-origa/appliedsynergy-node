var mongoose = require('mongoose');

var {Schema} = mongoose;


var productSchema = new Schema({
    name: {type: String},
    imageUrl: {type: String},
    price: {type: Number},
    category: {type: String},
    color: {type: String}
});

module.exports = mongoose.model('product', productSchema);