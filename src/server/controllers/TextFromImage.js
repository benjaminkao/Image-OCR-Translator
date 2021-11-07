const vision = require('./ApiConnections').vision;
const StorageController = require('./Storage').Controller;
const path = require('path');
const imageBucket = require('./Storage').imageBucket


//Edit the bucket name
const bucketName = 'ENTER_BUCKET_NAME';


const Controller = {

  extractTextfromImage: async (req, res, next) => {
    // console.log('testing:' + req.body.test1);
    console.log("sending image to Vision API");

    // Extract the image and the image name from the req.body
    // req.body.file
    // req.body.filename
    console.log(req.body);
    

    const newPicture = path.resolve('/tmp', req.body.filename);

    await req.body.file.mv(newPicture);

    console.log('Image moved in temporary directory');

    // imageBucket
      
    // https://cloud.google.com/vision/docs/ocr
    const [result] = await vision.textDetection(newPicture);

    const fullTextAnnotation = results[0].fullTextAnnotation;

    // Print to console the vision API results


    // Prepare Response
    // - text identified
    // - bounds/location of the text on the image
    // - assign color to text and bounds for frontend



    // Placeholder
    // Translate.translateText(results from the vision API)

    var jsonResponse = {};
    jsonResponse.fulltext = fullTextAnnotation.text;
    res.send(jsonResponse);


    // Store the image in a cloud bucket
    // StorageController.uploadImage(image);



    // Send response back

  }



}




module.exports = Controller;

// module.exports = {
//   // Performs text detection on the local file
//   // async ImageToText(filename){
//   //   const [result] = await client.textDetection(`gs://${bucketName}/${fileName}`);
//   //   const detections = result.textAnnotations;
//   //   console.log('Text:');
//   //   detections.forEach(text => console.log(text));
//   // }

// }
