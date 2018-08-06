let mongoose = require('mongoose');

// Defining Article Schema
let authorSchema = mongoose.Schema({
   name : {
      type : String,
      required : true
   },
   country : {
      type : String,
      required : true
   }
});

let Author = module.exports = mongoose.model('authors', authorSchema);