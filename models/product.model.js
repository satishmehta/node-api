let mongoose = require('mongoose');

//Defining product schema
//Another method
//'product' is Collection name in Mongo
let productModel = mongoose.model('product', {
   brand     : {type : String, required : true},
   model     : {type : String, required : true},
   inStock   : {type : Boolean, default : true},
   lastUpdate: {type : Date, default : Date.now },
   price     : Number
});

module.exports = productModel;
