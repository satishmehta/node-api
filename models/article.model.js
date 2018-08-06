/** Creating Models for 'Articles' Collections **/
let mongoose = require('mongoose');

// Defining Article Schema
let articleSchema = mongoose.Schema({
   title : {
      type : String,
      required : true
   },
   author : {
      type : String,
      required : true,
   },
   body : {
      type : String,
      required :true
   }
});

let Article = module.exports = mongoose.model('articles', articleSchema);