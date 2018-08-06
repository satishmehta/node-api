var express = require('express');
var router = express.Router();

//Bringing in Controllers
let defaultCtrl = require('./../controllers/default.ctrl');
let productCtrl = require('./../controllers/product.ctrl');

//Bringing in Models
let ArticleModel = require('./../models/article.model');
let AuthorModel  = require('./../models/author.model');

//Defining Variables
var articleData;
var authorData;

/* GET home page. */
router.get('/', function(req, res, next) {
  ArticleModel.find({}, function(err, article){
      if(err){
        console.log(err);      
      }else{  
        res.render('index', {
          title: 'Mozilla Firefox',
          articles : article
        });
      }    
  });

});

router.get('/default', defaultCtrl.get);
router.get('/default/health', defaultCtrl.health);

router.get('/articles', (req,res, next) => {
    ArticleModel.find({}, function(err, articles){
        if(err){
          console.log(err);      
        }else{          
          res.render('index', {
            title : 'Articles',
            articles : articles
          });      
        }
    });

});

router.get('/authors', (req, res, next) =>  {

    AuthorModel.find({}, (err, authors) => {
       if(err){
          console.log(err);          
       }else{          
          res.render('index',{
              title : 'Authors',
              articles : authors
          });
       }
    });

});

module.exports = router;
