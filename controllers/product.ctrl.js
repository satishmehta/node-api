let Product = require('../models/product.model');
let Review  = require('../models/review.model');

function productCtrl(req, res){

   this.get = function(req, res){

      var count;
      var pageSize, pageIndex;
      
      //Getting Total count from URL            
      if(req.params.pageSize){
            pageSize  = +req.params.pageSize;
      }else{
            pageSize = 10;
      }
      
      if(req.params.pageIndex){
            pageIndex = +req.params.pageIndex;
      }else{
            pageIndex = 0;
      }
       
      //Another Method:- If not Exist then OR 
      // var pageSize  = +req.params.pageSize || 10;
      // var pageIndex = +req.params.pageIndex || 0;
            
      //Deferred Execution
      var queryFind = Product
                  .find()
                  .sort("-lastUpdated") //Latest time first ("-" means Desc)
                  .skip(pageSize*pageIndex)
                  .limit(pageSize);                  

      //Execting Promises Chaining
      Product
            .count()
            .exec()
            .then(function(countVal){
                  count = countVal;
                  return queryFind.exec();             
            })
            .then(function(products){
                  var metadata = {
                        totalRecords : count,
                        totalPages   : Math.ceil(count/pageSize)
                  };
                  var response = {                     
                        metadata     : metadata,
                        products     : products
                  };
                  res.status(200); //Ok
                  res.send(response);
            })
            .catch(function(err){
                  res.status(500);
                  res.send(err);
            });
   };

   this.save = function(req, res){

      var productObj = new Product(req.body);

      productObj.save((err, product)=>{

         if(err){
            res.status(500); // Internal Server error
            // res.send('Internal Server Error');
            res.send(err);
         }else{
            res.status(201);
            res.send("Save Success!!!");
         }         
      });      
   };

   this.delete = function(req, res){

      var id = req.params.id;

      Product.findByIdAndRemove(id, (err) => {
         if(!err){
            res.status(204);
            res.send("Deleted!!!");
         }else{
            res.status(500);
            res.send("Internal Server Error");
         }
      });
   };

   /** Old Using Callback */
   this.getById_Old = function(req, res){

      var id = req.params.id;
      
      Product.findById(id, (err, product)=>{
            if(err){
                  res.status(500); //Internal server error
                  res.send("Intenal server error");
            }else{
                  var productResponse = product.toJSON();
                  productResponse.review = [];
                  
                  Review.find({productId:productResponse._id})
                        .sort("-lastUpdated")
                        .exec()
                        .then(function(reviewObj){
                              productResponse.review = reviewObj;
                              res.status(200);
                              res.json(productResponse);
                        })
                        .catch(function(err){
                              res.status(500);
                              res.send("Internal Server Error");
                        });
            }
      }); 
   }

   /** Using Promises (Preferred) */
   this.getById = function(req, res){

      var id = req.params.id;
      var productResponse;

      var reviewQuery = Review
                        .find({productId:id})
                        .sort("-lastUpdated"); //Latest time first ("-" means Desc)
      
      //Using Promises
      Product.findById({_id:id})
            .exec()
            .then(function(productDetails){
                  productResponse = productDetails.toJSON();
                  return reviewQuery.exec();
            })
            .then(function(reviewDetails){
                  productResponse['review'] = reviewDetails;
                  res.status(200);
                  res.json(productResponse);
            })
            .catch(function(err){
                  res.status(200);
                  res.send(err);
            });
   }

   this.update = function(req, res){

      var id = req.params.id;
      var product = new Product(req.body);

      Product.findByIdAndUpdate(id, product, function(err, upatedProduct){
         if(err){
            res.status(500);
            res.send("Internal Server Error");
         }else{
            res.status(200);
            res.send(upatedProduct);
         }
      });

   }   
}

//Exporting Function
module.exports = new productCtrl();


/************************* NOTES TO NOTICE pkill node************************** */
 /* Using Callback function */
      // Product.find((err, products)=>{
      //    if(err){
      //       res.status(500); //Internal server error
      //       res.send("Internal Server Error");
      //    }else{
      //       res.status(200);
      //       res.json(products);   
      //    }
      // });  
      
/** Working with promises rather than callback (Using Chaining) */
      // Product
      //    .find()
      //    .exec()
      //    .then(function(products){
      //       res.status(200); //Ok
      //       res.send(products);
      //    })
      //    .catch(function(err){
      //       res.status(500);
      //       res.send("Internal Server Error");
      //    });


/** Another way to execute Promises (Using Object)*/
      // var query = Product.find();
      //             query.skip(pageIndex*pageSize);
      //             query.limit(pageSize);
      //             query.exec();


/** Execting Nested Promises */
      // Product
      //    .count()
      //    .exec()
      //    .then(function(count){ 
            
      //       Product
      //          .find()
      //          .skip(pageSize*pageIndex)
      //          .limit(pageSize)
      //          .exec()
      //          .then(function(products){
      //             var metadata = {
      //                totalRecords : count,
      //                totalPages   : Math.ceil(count/pageSize)
      //             };
      //             var response = {                     
      //                metadata     : metadata,
      //                products     : products
      //             };
      //             res.status(200); //Ok
      //             res.send(response);
      //       })
      //       .catch(function(err){
      //             res.status(500);
      //             res.send("Internal Server Error");
      //       });
      //    })
      //    .catch(function(err){
      //       res.status(500);
      //       res.send(err);
      //    });

/** (Preferred) Executing Promises Chaining (Preferred) */
      // Product
      //       .count()
      //       .exec()
      //       .then(function(countVal){
      //             count = countVal;
      //             return query.exec();             
      //       })
      //       .then(function(products){
      //             var metadata = {
      //                   totalRecords : count,
      //                   totalPages   : Math.ceil(count/pageSize)
      //             };
      //             var response = {                     
      //                   metadata     : metadata,
      //                   products     : products
      //             };
      //             res.status(200); //Ok
      //             res.send(response);
      //       })
      //       .catch(function(err){
      //             res.status(500);
      //             res.send(err);
      //       });
