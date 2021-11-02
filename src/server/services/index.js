// Google Cloud Imports
const {Storage} = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'csc-847-project-3',
  keyFilename: '../../hidden.json'
});
const bucketName = 'test-847-p3';

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

//Add helper functions inside here.
//This makes our routes/api.js file less bulky
module.exports = {

  async uploadToBucket(filePath, fileName) {
    await storage.bucket(bucketName).upload(filePath, {
    destination: fileName,
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
  }

}
