var express = require('express');
var router = express.Router();

const TextToSpeechController = require('../controllers/TexttoSpeech').Controller;
const ImageUploadController = require('../controllers/UploadToBucket');
const TextFromImageController = require('../controllers/TextFromImage');

/* GET home page. */
router.get('/users', function(req, res, next) {
  console.log('get "users" route hit');
  res.send({ users: ["joe", "bernie", "tulsi", "donald", "bill"] });
});

router.post('/uploadImage', (req, res, next) {
  //Need parameters from request object...

  //Then upload file to bucket
  //ImageUploadController.upload(filename, filepath);
});

router.get('/TextFromImage', (req, res, next){
  /*
  const data = TextFromImageController.ImageToText(filename);
  res.send(data);
  */
})

router.post('/text-to-speech', (req, res, next) => {

  // Get the necessary parameters from the request object

  TextToSpeechController.makeRequest();

});


router.get('/text-to-speech/languages', (req, res, next) => {
  TextToSpeechController.listLanguages()
    .then((voices) => {
      res.send({voices: voices});
    });
})



module.exports = router;
