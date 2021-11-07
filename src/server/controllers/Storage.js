const path = require('path');
const storage = require('./ApiConnections').storage;


const imageBucket = storage.bucket(process.env.IMAGE_BUCKET);
const audioBucket = storage.bucket(process.env.AUDIO_BUCKET);


const Controller = {

    uploadImage: async (imagePath) => {
        await imageBucket.upload(imagePath, {resumable: false});

    },
    uploadAudio: async (audioPath) => {
        await audioBucket.upload(audioPath, {resumable: false})
    }
}




module.exports = {Controller, imageBucket};
