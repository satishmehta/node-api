let User = require('../models/user.model');
let jwt  = require('jsonwebtoken');

/* Exporting an Object */
module.exports = {

   register:function(req, res){

      var user = new User(req.body); //Payload

      user.save(function(err){
         if(!err){
            res.status(201);
            res.send('Register Success');
         }else{
            res.status(500);
            if(err && err.errmsg && err.errmsg.indexOf("E11000 duplicate key error index") > -1){
               res.send("Email Already Registered");
            }else{
               res.send(err);
            }            
         }
      });
   },

   login:function(req, res){      
      
      var userObj = new User(req.body);

      User.findOne({email:userObj.email, password:userObj.password})
         .exec()
         .then(function(user){
            if(user){
                  res.status(200);
            
                  //Creating JWT(Json Web Token) with user email as Payload 
                  var token = jwt.sign({email:user.email, roles:'admin'}, 'secretkey', {
                        expiresIn:"5m"
                  });

                  var response = {
                        email : user.email,
                        token : token
                  }
                  res.send(response);
            }else{
                  res.status(401); //Unauthorized
                  res.send('Unauthorized User');
            }
         })
         .catch(function(err){
            console.log(err);
            
            res.status(500);
            res.send(err);
         })
   }
}

/* Exporting Fucntion */
   // function userCtrl(req, res){
   //    this.register = function(err){
      
   //    };
   // }
   // Exporting UserCtrl Fucntion
   // module.exports = new userCtrl();