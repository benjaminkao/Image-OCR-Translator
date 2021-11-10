const vision = require('@google-cloud/vision');
// const filename1 = "/home/nidjyani/CSC847-Project-3-Group-3/src/server/uploads/imagefile.jpg"
  // Performs text detection on the local file
async function ImageToText(){
const client = new vision.ImageAnnotatorClient()

// const [result] = await client.textDetection(`gs://${bucketName}/${fileName}`);
const [result] = await client.textDetection("/home/nidjyani/CSC847-Project-3-Group-3/src/server/uploads/image3.jpeg");
const detections = result.textAnnotations;

console.log('Text:');
detections.forEach((text, index) => console.log(`${index}. ${text.description}`));
}
ImageToText();