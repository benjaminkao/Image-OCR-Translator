// Imports the Google Cloud client library
const translate = require('./ApiConnections').translate;

const LanguageCodes = {
  Arabic: "ar",
  English: "en",
  French: "fr",
  German: "de",
  Hindi: "hi",
  Italian: "it",
  Japanese: "ja",
  Korean: "ko",
  Mandarin: "zh",
  Spanish: "es",
};



const Controller = {
  translateText: async (text, language) => {
    // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  console.log(LanguageCodes[language]);
  let [translations] = await translate.translate(text, LanguageCodes[language]);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log('Translations:');
  translations.forEach((translation, i) => {
    console.log(`${text[i]} => (${language}) ${translation}`);
  });

  return translations;
  }
}




module.exports = Controller;
