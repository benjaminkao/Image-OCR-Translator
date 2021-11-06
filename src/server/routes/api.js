var express = require('express');
var router = express.Router();

var multer = require('multer');
let upload = multer();

const TextToSpeechController = require('../controllers/TexttoSpeech').Controller;
const ImageUploadController = require('../controllers/UploadToBucket');
const TextFromImageController = require('../controllers/TextFromImage');

/* GET home page. */
router.get('/users', function(req, res, next) {
  console.log('get "users" route hit');
  res.send({ users: ["joe", "bernie", "tulsi", "donald", "bill"] });
});


router.post('/uploadImage', upload.fields([]), (req, res, next) => {
  //Need parameters from request object...

  //Then upload file to bucket
  //ImageUploadController.upload(filename, filepath);

  console.log(req.body);

  console.log("ERROR: NOT IMPLEMENTED YET");
  res.send({
    status: "Failure",
    message: "Route is not implemented yet."
  });
});

router.get('/TextFromImage', (req, res, next) => {
  /*
  const data = TextFromImageController.ImageToText(filename);
  res.send(data);
  */
})

router.get('/text-to-speech/upload', (req, res, next) => {
  console.log("ERROR: NOT IMPLEMENTED YET");
  res.send({
    status: "Failure",
    message: "Route is not implemented yet."
  });
})

router.get('/text-to-speech/languages', (req, res, next) => {
  TextToSpeechController.listLanguages()
    .then((voices) => {
      res.send({voices: voices});
    });
})



module.exports = router;
