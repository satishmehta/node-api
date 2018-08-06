let mongoose = require('mongoose');

module.exports = mongoose.model("User", {
   email       : {type :String, required : [true, 'Email field is mandatory'], unique: true},
   password    : {type: String, required : [true, 'Password field is mandatory'], minlength: [3, 'Minimum 3 Char'], maxlength: [10, 'Maximum 10 char']},
   active      : {type: Boolean,default  : false},
   lastUpdated : {type: Date,   default  : Date.now},
   phone       : {type: String, validate :{
         validator: function(val){
            return /[0-9]{10}/.test(val);
         }
   }}
});