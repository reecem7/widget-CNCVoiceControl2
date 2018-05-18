//  var extend = require('extend');
//  //load vcapServices
//  var vcapServices = require('vcap_services');
//  var config = require('../config/env.json');
//
//  var ttsConfig = extend(config.text_to_speech, vcapServices.getCredentials('text_to_speech'));
//  //convConfig is object with kv pairs from env.json
//
//    //load conversation module
//    var TtsV1 = require('../node_modules/watson-developer-cloud/text-to-speech/v1.js');
//
// const tts = new TtsV1({
// // ttsConfig
// // username: '<username>',
// username: "5718f547-f9be-42e0-82cf-0132f7f2b6cd",
// password: "qkqlZYRK3sUf",
// url: "https://stream.watsonplatform.net/text-to-speech/api"
// });

const watson = require('watson-developer-cloud');
const authorizationService = new watson.AuthorizationV1({
  username: process.env.TEXT_TO_SPEECH_USERNAME || "",
  password: process.env.TEXT_TO_SPEECH_PASSWORD || "",
  url: "https://stream.watsonplatform.net/text-to-speech/api"
});

// Inform user that TTS is not configured properly or at all
if (!(process.env.TEXT_TO_SPEECH_USERNAME && process.env.TEXT_TO_SPEECH_PASSWORD)) {
  // eslint-disable-next-line
  console.warn('WARNING: The app has not been configured with a TEXT_TO_SPEECH_USERNAME and/or ' +
    'a TEXT_TO_SPEECH_PASSWORD environment variable. If you wish to have text to speech ' +
    'in your working application, please refer to the https://github.com/watson-developer-cloud/car-dashboard ' +
    'README documentation on how to set these variables.');
}


module.exports = function initTextToSpeech(app) {
  app.get('/api/text-to-speech/token', (req, res) =>
    authorizationService.getToken(function (err, token) {
      if (err) {
        console.log('error:', err);
        console.log('Please refer to the https://github.com/watson-developer-cloud/car-dashboard\n' +
          'README documentation on how to set username and password variables.');
      } else {
        res.send(token);
      }
    })
  );
};
