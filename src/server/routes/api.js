var express = require('express');
var router = express.Router();

const TextToSpeechController = require('../controllers/TexttoSpeech').Controller;


/* GET home page. */
router.get('/users', function(req, res, next) {
  console.log('get "users" route hit');
  res.send({ users: ["joe", "bernie", "tulsi", "donald", "bill"] });
});

router.get('/image/upload', (req, res, next) => {
  console.log("ERROR: NOT IMPLEMENTED YET");
  res.send({
    status: "Failure",
    message: "Route is not implemented yet."
  });
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