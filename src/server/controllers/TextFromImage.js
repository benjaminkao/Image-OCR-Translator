const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
    keyFilename: "../../hidden.json"
});
//Edit the bucket name
const bucketName = 'ENTER_BUCKET_NAME';


module.exports = {
  // Performs text detection on the local file
  async ImageToText(filename){
    const [result] = await client.textDetection(`gs://${bucketName}/${fileName}`);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text));
  }
}
