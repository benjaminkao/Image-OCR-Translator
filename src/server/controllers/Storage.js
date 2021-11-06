const path = require('path');
const storage = require('./ApiConnections').storage;


const imageBucket = storage.bucket(process.env.IMAGE_BUCKET);
const audioBucket = storage.bucket(process.env.AUDIO_BUCKET);


const Controller = {

    uploadImage: async (image) => {
        const newPicture = path.resolve('/tmp', image.name);

        await requestAnimationFrame.files.image.mv(newPicture);

        console.log('Image moved in temporary directory');

        await imageBucket.upload(newPicture, {resumable: false});

    },
    uploadAudio: (audio) => {
        
    }
}




module.exports = Controller;
