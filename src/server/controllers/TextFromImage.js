const vision = require('./ApiConnections').vision;

const path = require('path');
const imageBucket = require('./Storage').imageBucket


//Edit the bucket name
const bucketName = 'image-csc847';

const Controller = {
  /**
   * 
   * @param {string} imagePath Relative path of the image
   * @returns 
   */
  extractTextfromImage: async (imagePath) => {
    // console.log('testing:' + req.body.test1);
    console.log("sending image to Vision API");

    // https://cloud.google.com/vision/docs/ocr
    const [result] = await vision.textDetection(path.resolve(imagePath));

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