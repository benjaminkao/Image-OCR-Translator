const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

const client = require('./ApiConnections').textToSpeech;

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
}

const VoiceGender = {
    FEMALE: "FEMALE",
    MALE: "MALE",
    GENERAL: "SSML_VOICE_GENDER_UNSPECIFIED"
}


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
    makeRequest: async (imageName, text, languageCode, voiceGender) => {

        // Make sure language is supported by Google Text to Speech
        if(!(languageCode in LanguageCode)) {
            throw Error({
                message: `${languageCode} is not a supported Google Text to Speech language.`
            });
        }

        // Make sure voiceGender is one of the supported Google Text to Speech ssmlGender options
        if(!(voiceGender in VoiceGender)) {
            throw Error({
                message: `${voiceGender} is not a supported Google Text to Speech voice gender.`
            });
        }


        const request = {
            input: {text: text},
            voice: {languageCode: languageCode, ssmlGender: voiceGender},
            audioConfig: {audioEncoding: 'MP3'},
        }

        // Performs the text-to-speech request
        const [response] = await client.synthesizeSpeech(request);

        // Write the binary audio content to a local file

        // TODO: Set the name of the audio file to be the same name as the picture
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(`${imageName}.mp3`, response.audioContent, 'binary');
        console.log(`Audio content written to file: ${imageName}.mp3`);


        // Store the newly created audio file into a Google Cloud Storage Bucket

    }

}



module.exports = {Controller, VoiceGender, LanguageCodes};