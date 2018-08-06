var bunyan = require('bunyan');

//Creating Morgan Logger Object
var logger = bunyan.createLogger({
   name: 'api-logger',
   streams : [{
      path : 'detail-log.txt',
      level: 'info' //warning,info,error
   }]
});

var defaultCtrl = {
  
   get:function(req, res){
      res.status(200);
      logger.info({name: 'test-logger'});
      res.send("Hello Express");
   },
   health: function(req, res){
      var health = {status :"up"};
      res.status(200);
      res.json(health);
   }
   
};

//Exporting variable
module.exports = defaultCtrl;