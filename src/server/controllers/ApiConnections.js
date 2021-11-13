const fs = require('fs');
const path = require('path');

// Google Cloud Imports
const TextToSpeech = require('@google-cloud/text-to-speech');
const {Storage} = require('@google-cloud/storage');
const {Translate} = require('@google-cloud/translate').v2;
const Vision = require('@google-cloud/vision');

var storage, textToSpeech, translate, vision;

var stats = fs.existsSync("./hidden.json");
console.log("Stats: " + stats);

if(stats) {
    storage = new Storage({
    });

    textToSpeech = new TextToSpeech.TextToSpeechClient({
        keyFilename: "./hidden.json"
    });

    translate = new Translate({
        keyFileName: "./hidden.json"
    });

    vision = new Vision.ImageAnnotatorClient({
        keyFilename: "./hidden.json"
    });

} else {
    console.log("hidden.json does not exist. Assuming running on Google Cloud.");

    storage = new Storage();
    textToSpeech = new TextToSpeech.TextToSpeechClient();
    translate = new Translate();
    vision = new Vision.ImageAnnotatorClient();
}



// try {
//     console.log("Checking for hidden.json file");
//     var stats = fs.existsSync(path.join(__dirname, "../../hidden.json"));
//     console.log("Stats: " + stats);
//     storage = new Storage({
//         keyFileName: '../../hidden.json'
//     });

//     textToSpeech = new TextToSpeech.TextToSpeechClient({
//         keyFilename: "../../hidden.json"
//     });

//     translate = new Translate({
//         keyFileName: "../../hidden.json"
//     });

//     vision = new Vision.ImageAnnotatorClient({
//         keyFilename: "../../hidden.json"
//     });

// } catch(err) {
//     console.log("hidden.json does not exist. Assuming running on Google Cloud.");

//     storage = new Storage();
//     textToSpeech = new TextToSpeech.TextToSpeechClient();
//     translate = new Translate();
//     vision = new Vision.ImageAnnotatorClient();
// }


module.exports = {storage, textToSpeech, translate, vision}