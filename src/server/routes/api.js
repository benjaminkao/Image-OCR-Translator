var express = require("express");
var router = express.Router();

// var multer = require('multer');
// let upload = multer({dest: 'tmp/'});
// var type = upload.single('file');

const TextToSpeechController = require('../controllers/TexttoSpeech').Controller;
const ImageUploadController = require('../controllers/UploadToBucket');
const TextFromImageController = require('../controllers/TextFromImage');
const TranslationController = require('../controllers/Translate');

/* GET home page. */
router.get("/users", function (req, res, next) {
  console.log('get "users" route hit');
  res.send({ users: ["joe", "bernie", "tulsi", "donald", "bill"] });
});


router.post('/uploadImage', async (req, res, next) => {
  //Need parameters from request object...

  //Then upload file to bucket

  // Get the results from the Vision API
  var words_bag = TextFromImageController.extractTextfromImage(req, res, next);


  // Send the results to the Translate API and get those results



  // Send the results to the Text-to-Speech API and get those results


  // Build the response object


  // Send the response

  

  // console.log("ERROR: NOT IMPLEMENTED YET");

  // Need to implement usage for words_bag
  res.send({
    status: "success",
    languages: words_bag
  });

});

//Run text-to-speech/test, then run uploadAudio/test
router.post('/uploadAudio/test', (req, res, next) =>{
  const filepath = '../testImage-English-GENERAL.mp3';
  const filename = 'sample1357';
  ImageUploadController.uploadFile(filepath, filename);

  res.send("uploadAudio/test complete! Check bucket");
})


router.post("/text-to-speech", (req, res, next) => {
  // TODO: Need to get these parameters from the request object:
  // - imageName
  // - text
  // - selected language

  TextToSpeechController.makeRequest()
    .then((url) => {
      res.send({
        status: "success",
        url: url,
      });
    })
    .catch((err) => {
      res.send({
        status: "failure",
        message: err.message,
      });
    });
});

router.get("/text-to-speech/test", (req, res, next) => {
  // Test Route for Text-to-Speech API

  console.log("Testing the Text-to-Speech API.");

  TextToSpeechController.makeRequest("testImage", "This is a test of the text-to-speech API", "Japanese")
    .then((url) => {
      res.send({
        status: "success",
        url: url,
      });
    })
    .catch((err) => {
      res.send({
        status: "failure",
        message: err.message,
      });
    });
});

router.get('/text-to-speech/testAudio', (req, res, next) => {
  res.send({
    status: "success",
    url: "https://storage.googleapis.com/audio-files-csc-847-project-3/test.mp3"
  });
})


router.get("/text-to-speech/languages", (req, res, next) => {
  const languages = TextToSpeechController.listLanguages();

  res.send({
    status: "success",
    languages: languages,
  });

})

router.get('/translate/test', (req, res, next) =>{
  TranslationController.translateText('This is a test of the Translation API', 'es')
    .then((result) => {
      res.send(result);
    })
})



module.exports = router;

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, 'imagefile.jpg');
//     }
// });
// var upload = multer({ storage: storage });

// router.get('/', upload.single('imagefile'), function(req, res, next) {
//     extractTextfromImage(req, res);
// });
