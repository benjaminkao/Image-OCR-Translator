const fs = require('fs');
const path = require('path');
const storage = require('./ApiConnections').storage;

const imageBucket = storage.bucket(process.env.IMAGE_BUCKET);
const audioBucket = storage.bucket(process.env.AUDIO_BUCKET);

const Controller = {

    uploadImage: async (imagePath) => {
        console.log(`Uploading ${imagePath} to Google Cloud Storage`);
        await imageBucket.upload(imagePath, {resumable: false});

        fs.unlink(imagePath, (err) => {
            if (err) throw err;
            

            var stat = fs.existsSync(imagePath);

            if(!stat) {
                console.log(`successfully deleted ${imagePath}`);
            }
          });

    },
    uploadAudio: async (audioPath) => {
        

        var stats = fs.existsSync(audioPath);

        if(!stats) {
            console.log("Audio File does not exist.");

            throw Error({
                message: "Audio File does not exist."
            })
        }
        console.log(`Uploading ${audioPath} to Google Cloud Storage`);

        audioBucket.upload(audioPath, {
            name: audioPath,
            destination: audioPath,
            resumable: true,
            contentType: "audio/mpeg"
          })
            .then((result) => {
                console.log("Completed");
            })
            .catch((err) => {
                console.log("got here");
                console.log(err);
                throw err;
            });
        

            fs.unlink(audioPath, (err) => {
                if (err) throw err;
                
                var stat = fs.existsSync(audioPath);

                if(!stat) {
                    console.log(`successfully deleted ${audioPath}`);
                }
              });
        

    },
    getImage: async (fileName) => {
        var file = imageBucket.file(fileName);
  
        file.exists().then((data) => {
            console.log(data);
            console.log("File in database exists ");
        });
    },
    getAudio: async (fileName) => {
        var file = audioBucket.file(fileName);

        file.exists().then((data) => {
            console.log(data)
        });
    },
    getImageURL: (fileName) => {
        return `https://storage.googleapis.com/${process.env.IMAGE_BUCKET}/${fileName}`;
    },
    getAudioURL: (fileName) => {
        return `https://storage.googleapis.com/${process.env.AUDIO_BUCKET}/${fileName}.mp3`;
    }
}




// module.exports = {Controller, imageBucket};
module.exports = {Controller}
