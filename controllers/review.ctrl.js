let Review = require('../models/review.model');

module.exports = {

   save: function(req, res){
      //Payload
      var review = new Review(req.body);

      review.save()
         .then((obj) => {
            res.status(200);
            res.json(obj);
         })
         .catch((err) => {
            res.status(500);
            res.send("Internal Server Error");
         });
   }
}