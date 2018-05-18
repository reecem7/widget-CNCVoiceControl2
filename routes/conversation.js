/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 //only use below if using
 // var extend = require('extend');
 // var vcapServices = require('vcap_services');
 //var config = require('../config/env.json');
 // var convConfig = extend(config.conversation, vcapServices.getCredentials('conversation'));

//const watson = require('watson-developer-cloud'); // watson sdk
  const ConversationV1 = require('../node_modules/watson-developer-cloud/conversation/v1.js');
// Create the service wrapper

const conversation = new ConversationV1({
  // If unspecified here, the ASSISTANT_USERNAME and ASSISTANT_PASSWORD env properties will be checked
  // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
  // username: convConfig.username,
  // username:"3702aaac-1936-4496-97b5-543d0aa5b1b7",
  // password: convConfig.password,
  // password: "wbtZ6BQB8Kkl",
  // url: convConfig.url,
  //url: "https://gateway.watsonplatform.net/conversation/api/",
  // url: "https://gateway.watsonplatform.net/assistant/api",
  // version_date: "2017-05-26" //not sure if this is right and/or needed???
  username: process.env.ASSISTANT_USERNAME || '3702aaac-1936-4496-97b5-543d0aa5b1b7',
  password: process.env.ASSISTANT_PASSWORD || 'wbtZ6BQB8Kkl',
  url: 'https://gateway.watsonplatform.net/conversation/api/',
  version_date: '2018-02-16'
});

/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */
const updateMessage = (input, response) => {
  var responseText = null;
  if (!response.output) {
    response.output = {};
  } else {
    return response;
  }
  if (response.intents && response.intents[0]) {
    var intent = response.intents[0];
    // Depending on the confidence of the response the app can return different messages.
    // The confidence will vary depending on how well the system is trained. The service will always try to assign
    // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
    // user's intent . In these cases it is usually best to return a disambiguation message
    // ('I did not understand your intent, please rephrase your question', etc..)
    if (intent.confidence >= 0.75) {
      responseText = 'I understood your intent was ' + intent.intent;
    } else if (intent.confidence >= 0.5) {
      responseText = 'I think your intent was ' + intent.intent;
    } else {
      responseText = 'I did not understand your intent';
    }
  }
  response.output.text = responseText;
  return response;
};


module.exports = function(app) {

  app.post('/api/message', (req, res, next) => {
    // const workspace = "fd10c3c5-b17c-4554-8402-edfdb52a157c";
    const workspace = process.env.WORKSPACE_ID || "fd10c3c5-b17c-4554-8402-edfdb52a157c";
    if (!workspace || workspace === '<workspace-id>') {
      return res.json({
        output: {
          text: 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' +
            '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> ' +
            'documentation on how to set this variable. <br>' +
            'Once a workspace has been defined the intents may be imported from ' +
            '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> ' +
            'in order to get a working application.'
        }
      });
    }
    const payload = {
      workspace_id: workspace,
      context: req.body.context || {},
      input: req.body.input || {}
    };

    // Send the input to the conversation service
    conversation.message(payload, (error, data) => {
      if (error) {
        return next(error);
      }
      return res.json(updateMessage(payload, data));
    });
  });
};
