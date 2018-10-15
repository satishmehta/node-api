var express       = require('express');
var path          = require('path'); // For Using Comman Path
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var favicon       = require('serve-favicon');
var fs            = require('fs'); // File Stream
var cors          = require('cors');

//Routes Paths
var indexRouter   = require('./routes/index.router');
var productRouter = require('./routes/product.router');
var userRouter    = require('./routes/user.router');

// Others additional Packages
let jwt           = require('jsonwebtoken');
var morganLogger  = require('morgan'); // Morgan Logger

//Connecting to Mongo DB
var mongoose = require('mongoose');

//Assigning Global Promises as Mongoose Promises
mongoose.Promise = global.Promise;
 
// mongoose.connect('mongodb://localhost:27017/nodekb');
// mongoose.connect('mongodb://satish:admin@123@ds119110.mlab.com:19110/mehtadb');
mongoose.connection.openUri('mongodb://satish:admin123@ds119110.mlab.com:19110/mehtadb');  // Another method to connect

let db = mongoose.connection;
// Check MongoDb Connection 
db.once('open', function(err){
  if(err){
    console.log(err);
  }else{
    console.log('Connected to MongoDB Database: '+ mongoose.connection.name);
  }  
});
//Check for dbs error
db.on('error', function(err){
  console.log(err);
});

var app = express();

app.use(cors());
// View engine setup
app.set('views', path.join(__dirname, 'views')); // c://nodeapp/views
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


/* Using Morgan for Log */
//Getting File Stream for log file c://nodeapp/logs.txt
var accessLogFileStream = fs.createWriteStream(path.join(__dirname , '/logs.txt'), {flags: 'a'});
app.use(morganLogger('combined',{stream: accessLogFileStream}));

// body-parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie-parser setup
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Defining Routes path for Index and Users (Public Routes)
app.use('/', indexRouter);
app.use('/api/users', userRouter);

app.use;
//Authentication middleware
function authenticate(req, res, next){
  /* (Simple authentication) Taking values from headers */
    // if(req.headers["username"] === 'admin' && req.headers["password"] === 'admin'){
    //   next();
    // }else{
    //   res.status(401);
    //   res.send("Unauthorized User");
    // }

    //Verifying JWT Token
    var user = jwt.verify(req.headers['authorization'], 'secretkey', function(err){
      if(!err){
        next();
      }else{
        res.status(500);
        res.send(err);
      }
    });
}

//Using Middleware
// app.use(authenticate);

//Private Route
app.use('/api/products', productRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('404 - Page Not Found');  
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;  
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;