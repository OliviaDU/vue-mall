let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    "productId": String,
    "productName": String,
    "salePrice": Number,
    "checked": Boolean,
    "productNum": Number,
    "productImage": String
});

//定义Good，默认会加s进行查找goods这个collection，也可以在第三个参数指定集合名
module.exports = mongoose.model('Good', productSchema);
