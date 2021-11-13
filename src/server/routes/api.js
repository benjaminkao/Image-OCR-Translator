var express = require("express");
var router = express.Router();
const path = require('path');

// var multer = require('multer');
// let upload = multer({dest: 'tmp/'});
// var type = upload.single('file');

const TextToSpeechController = require('../controllers/TexttoSpeech').Controller;
const ImageUploadController = require('../controllers/UploadToBucket');
const TextFromImageController = require('../controllers/TextFromImage');
const TranslationController = require('../controllers/Translate');
const StorageController = require('../controllers/Storage').Controller;

/* GET home page. */
router.get("/users", function (req, res, next) {
  console.log('get "users" route hit');
  res.send({ users: ["joe", "bernie", "tulsi", "donald", "bill"] });
});


router.post('/uploadImage', async (req, res, next) => {
  //Need parameters from request object...

  const language = req.body.language;

  //Then upload file to bucket
  // Extract the image and the image name from the req.body
  const image = req.files.file
  console.log(image.name);
  // console.log(image);

  const newPicture = path.resolve('/tmp', image.name);

  console.log(newPicture);
  console.log("moving image");
  await image.mv(newPicture);

  console.log('Image moved in temporary directory');


  // Upload image to Google Cloud Storage bucket
  console.log('Uploading image to Google Cloud Storage Bucket');
  StorageController.uploadImage(newPicture);

  console.log(path.resolve(newPicture));

  // Get the results from the Vision API
  var words_bag = await TextFromImageController.extractTextfromImage(newPicture);


  // Send the results to the Translate API and get those results
  var translated_words = await TranslationController.translateText(words_bag, language);

  console.log(translated_words)

  // Send the results to the Text-to-Speech API and get those results
  var url = await TextToSpeechController.makeRequest(image.name, translated_words.join('. '), language); 

  console.log(url);

  // Need to implement usage for words_bag
  res.send({
    status: "success",
    text: words_bag,
    translated: translated_words,
    audio: url
  });

});

router.post('/translate', async (req, res, next) => {
  console.log(req.body);

  // Get Request parameters
  const language = req.body.language;
  const imageName = req.body.filename;
  const text = req.body.text.split('\n');

  console.log(text);

  // Send text and language to Translate API

  var translated_words = await TranslationController.translateText(text, language);

  // Send translated text to Text-to-Speech API

  var url = await TextToSpeechController.makeRequest(imageName, translated_words.join('. '), language); 

  console.log(url);

  res.send({
    status: "success",
    translated: translated_words,
    url: url
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
