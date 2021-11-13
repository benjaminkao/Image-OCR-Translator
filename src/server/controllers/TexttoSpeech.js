const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");
const path = require('path');

const client = require("./ApiConnections").textToSpeech;
const StorageController = require("./Storage").Controller;

const LanguageCodes = {
  // Need to figure out issues with language codes and language names
  // (language names are not descriptive enough so we may just have to pick and choose the languages we want)
  Arabic: "ar-XA",
  English: "en-US",
  French: "fr-FR",
  German: "de-DE",
  Hindi: "hi-IN",
  Italian: "it-IT",
  Japanese: "ja-JP",
  Korean: "ko-KR",
  Mandarin: "cmn-CN",
  Spanish: "es-ES",
};

const VoiceGender = {
  FEMALE: "FEMALE",
  MALE: "MALE",
  GENERAL: "SSML_VOICE_GENDER_UNSPECIFIED",
};

const Controller = {
    listLanguages: () => {
        // const [result] = await client.listVoices();
        // const voices = result.voices;

        // console.log('Voices: ');
        // voices.forEach(voice => {
        //     console.log(`Name: ${voice.name}`);
        //     console.log(`  SSML Voice Gender: ${voice.ssmlGender}`);
        //     console.log(`  Natural Sample Rate Hertz: ${voice.naturalSampleRateHertz}`);
        //     console.log('  Supported languages:');
        //     voice.languageCodes.forEach(languageCode => {
        //         console.log(`    ${languageCode}`);
        //     });
        // });

        return LanguageCodes;
    },
    /**
     * 
     * @param {string} imageName The name of the image that was used to store the image in the Uploaded Images Bucket. This will be the prefix of the audio file name.
     * @param {string} text 
     * @param {string} languageCode 
     * @param {string} voiceGender 
     * @returns {string} Returns the public URL of the audio file in the Google Cloud Storage
     */
    makeRequest: async (imageName, text, language, voiceGender = "GENERAL") => {

        // Make sure language is supported by Google Text to Speech
        if(!(language in LanguageCodes)) {
            throw Error({
                message: `${language} is not a supported Google Text to Speech language.`
            });
        }

        // Make sure voiceGender is one of the supported Google Text to Speech ssmlGender options
        if(!(voiceGender in VoiceGender)) {
            throw Error({
                message: `${voiceGender} is not a supported Google Text to Speech voice gender.`
            });
        }

        // Check if an audio file with the requested language already exists for the image
        const fileName = `${imageName}-${language}-${voiceGender}`;

        const fileExists = await StorageController.getAudio(fileName);

        if(fileExists) {
            // Return the name of the audio file
            console.log("Audio File already exists for that image.");
            return StorageController.getAudioURL(fileName);
        }

        // Audio File doesn't already exist, need to make a request to the Google Cloud Text-to-Speech API

        const request = {
            input: {text: text},
            voice: {languageCode: LanguageCodes[language], ssmlGender: voiceGender},
            audioConfig: {audioEncoding: 'MP3'},
        }

        // Performs the text-to-speech request
        const [response] = await client.synthesizeSpeech(request);

        // Write the binary audio content to a local file

        const writeFile = util.promisify(fs.writeFile);
        await writeFile(`${fileName}.mp3`, response.audioContent, 'binary');
        console.log(`Audio content written to file: ${fileName}.mp3`);


        // Store the newly created audio file into a Google Cloud Storage Bucket
        try{
            StorageController.uploadAudio(`${fileName}.mp3`);
        } catch(err) {
            console.log("got here");
            console.log(err);
        }

        return StorageController.getAudioURL(fileName);
    }

};

module.exports = { Controller, VoiceGender, LanguageCodes };
