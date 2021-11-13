const vision = require('./ApiConnections').vision;
const StorageController = require('./Storage').Controller;
const path = require('path');
const imageBucket = require('./Storage').imageBucket


//Edit the bucket name
const bucketName = 'image-csc847';

const Controller = {

  extractTextfromImage: async (req, res, next) => {
    // console.log('testing:' + req.body.test1);
    console.log("sending image to Vision API");
    // 
    // Extract the image and the image name from the req.body
    const image = req.files.file
    console.log(image.name);
    console.log(image);

    const newPicture = path.resolve('./uploads', image.name);

    console.log(newPicture);
    console.log("moving image");
    await image.mv(newPicture);

    console.log('Image moved in temporary directory');


    // Upload image to Google Cloud Storage bucket
    console.log('Uploading image to Google Cloud Storage Bucket');
    StorageController.uploadImage(newPicture);

    // imageBucket
    console.log(path.resolve(newPicture));

    // https://cloud.google.com/vision/docs/ocr
    const [result] = await vision.textDetection(path.resolve(newPicture));

    const detections = result.textAnnotations;

    var item_names = detections[0].description.split("\n").slice(0, -1);
    // Print to console the vision API results

    console.log('Text:');
    console.log(item_names)
    // detections.forEach((text, index) => console.log(`${index}. ${text.description}`));

    // //Store the image in a cloud bucket
    // StorageController.uploadImage(image);

    // // Send response back
    // var jsonResponse = {};
    // jsonResponse.fulltext = fullTextAnnotation.text;
    // res.send(jsonResponse);

    // how do we access the variable in the calling function ?
    return item_names;

  }
}
module.exports = Controller;