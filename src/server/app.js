var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');


require("dotenv").config({
  path: path.join(__dirname, "../../.env"),
  debug: true  
});

const apiRouter = require('./routes/api');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(fileUpload());


app.use('/api', apiRouter);
//app.use('/upload', uploadRouter)

app.use(express.static(path.join(__dirname, "./build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("/*", (req, res) => {
  console.log("req.path", req.path);
  res.sendFile(path.join(__dirname + "./build/index.html"));
});


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });



// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



module.exports = app;
