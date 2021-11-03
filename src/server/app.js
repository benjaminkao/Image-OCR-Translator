var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//routes
const apiRouter = require('./routes/api');
var uploadRouter = require('./routes/upload');

// Google Cloud Imports
const {Storage} = require('@google-cloud/storage');
const vision = require('@google-cloud/vision')
//const translate = require('@google-cloud/translate');
//const textToSpeech = require('@google-cloud/text-to-speech');
const Buffer = require('safe-buffer').Buffer; //to interact with binary data


const storage = new Storage({
  projectId: 'csc-847-project-3',
  keyFilename: '../../hidden.json'
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api', apiRouter);
app.use('/upload', uploadRouter)




app.use(express.static(path.join(__dirname, "../client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("/*", (req, res) => {
  console.log("req.path", req.path);
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
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
