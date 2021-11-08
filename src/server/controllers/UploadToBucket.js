// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({
    keyFilename: "../../hidden.json"
});
//Edit the bucket name
const bucketName = 'ENTER_BUCKET_NAME';

module.exports = {
  async uploadFile(filePath, fileName) {
    await storage.bucket(bucketName).upload(filePath, {
      name: fileName,
      destination: fileName,
      resumable: true,
      contentType: "audio/mpeg"
    });

    console.log(`${filePath} uploaded to ${bucketName}`);
  }
}
