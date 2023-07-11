var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors=require('cors')
var logger = require('morgan');
var fileUpload=require('express-fileupload');
var db=require('./config/connection');
var session=require('express-session');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/admin');

const { start } = require('repl');

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,  'public')));
app.use(fileUpload())

app.use(session({secret:'key',cookie:{maxAge:900000}}))
app.use(
  cors({
    origin: "http://localhost:3000", "https://e-commerce11-lzp1.onrender.com"

      })
  )

db.connect((err)=>{
  if(err)  console.log('error'+err);
  else   console.log('database');
  
  

})

app.use('/', usersRouter)
app.use('/admin', indexRouter);

//static files
 
app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,res){
   res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
