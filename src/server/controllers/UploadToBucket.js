// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();
const bucketName = 'ENTER_BUCKET_NAME';

module.exports = {
  async uploadFile(filePath, fileName) {
    await storage.bucket(bucketName).upload(filePath, {
      destination: fileName,
    });

    console.log(`${filePath} uploaded to ${bucketName}`);
  }
}
