var express = require('express');
var router = express.Router();
const vision = require('@google-cloud/vision');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, 'imagefile.jpg');
    }
});
var upload = multer({ storage: storage });

// router.post('/', upload.single('imagefile'), function(req, res, next) {
//     extractTextfromImage(req, res);
// });

router.get('/', upload.single('imagefile'), function(req, res, next) {
    extractTextfromImage(req, res);
});

module.exports = router;

// Move this function to a separate file?
function extractTextfromImage(req, res) {
    // console.log('testing:' + req.body.test1);
    console.log("sending image to Vision API");
    const client = new vision.ImageAnnotatorClient();
    const fileName = './uploads/imagefile.jpg';
    client.documentTextDetection(fileName).then(results => {
        const fullTextAnnotation = results[0].fullTextAnnotation;
        var jsonResponse = {};
        jsonResponse.fulltext = fullTextAnnotation.text;
        res.send(jsonResponse);
    });
}