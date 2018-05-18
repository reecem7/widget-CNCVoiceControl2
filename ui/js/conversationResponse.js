/*
 * Copyright © 2016 I.B.M. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* The Intents module contains a list of the possible intents that might be returned by the API */

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^ConversationResponse$" }] */
/* global Animations: true, Api: true, Panel: true */

var ConversationResponse = (function () {
  'use strict';

  return {
    init: init,
    responseHandler: responseHandler
  };

  function init() {
    setupResponseHandling();
  }

  function actionFunctions(action) {
    // if(action.cmd === 'warm') {
    //   console.log('yayayya');
    // }
    // else if(action.cmd === 'wipers_on') {// turn on commands
    //   Animations.wipersOn('lo');
    // } else if(action.cmd === 'lights_on') {
    //   Animations.lightsOn();
    // }
  }

  // Create a callback when a new Watson response is received to handle Watson's response
  function setupResponseHandling() {
    var currentResponsePayloadSetter = Api.setWatsonPayload;
    Api.setWatsonPayload = function (payload) {
      currentResponsePayloadSetter.call(Api, payload);
      responseHandler(payload);
    };
  }

  // Called when a Watson response is received, manages the behavior of the app based
  // on the user intent that was determined by Watson
  function responseHandler(data) {
    let output = data.output;
    let action = output.action;
    // let context =''; //create dummy variable for context so STT can be iniated before conversation service returns message with context defined
    // let stt = ''; //create dummy variable for context so STT can be iniated before conversation service returns message with context defined
    // context = data.context; //update context value
    // stt = data.context.stt; //update context value

    // let statusValue = data.context.status;
    // let sttValue = data.context.stt;
    // let txtInputValue =  data.context.txtInput;

    // console.log('status: ' + statusValue + '   txtInput: ' + txtInputValue + '   stt: ' + sttValue);
    // console.log(output);
    // console.log(output.text);

    if(output.text === ""){
      console.log('background noise');
        if(data.context.stt){
        console.log('<-- pausing: voice input -->');
        STTModule.pauseMic();
          setTimeout(function(){
            STTModule.speechToText();
          }, 1200);
          console.log('<-- starting: voice input -->');
        }
      console.log('---------------------------------------------------');
    }
    else if(action){

    // if(data.context.stt){
      // console.log('---------------------------------------------------');
      console.log('<-- recognized: action -->  ');
      console.log(action);
        if(data.context.stt){
        console.log('<-- pausing: voice input -->');
        STTModule.pauseMic();

          cmds.returnCmd(action);

          setTimeout(function(){
            STTModule.speechToText();
          }, 1600);
          console.log('<-- starting: voice input -->');
        }else{
          cmds.returnCmd(action);
        }
        console.log('---------------------------------------------------');
        return;
      }
      // else if(data.context.txt){
  //     console.log('---------------------------------------------------');
  //       console.log('<-- txt input only -->');
  //       cmds.returnCmd(action);
  //     console.log('---------------------------------------------------');
  //
  //   }
  // }else if(data.output){
  //     console.log('---------------------------------------------------');
  //       console.log('<-- NO Action -->');
  //       setTimeout(function(){
  //         STTModule.speechToText();
  //       }, 1800);
  //       console.log('---------------------------------------------------');
  //
  //     }
    // if(action){
    //   console.log('---- Action Found ----');
    //   console.log('--------------------------');
    //
    //   if(context.txt && context.stt){
    //     console.log('voice input');
    //     cmds.returnCmd(action);
    //     console.log('continuting listening');
    //     // console.log('STT enabled');
    //     // setTimeout(function(){
    //     //   STTModule.speechToText();
    //     // }, 1800);
    //
    //   }
    //   else if(context.txt){
    //     console.log('text input');
    //     cmds.returnCmd(action);
    //     // setTimeout(function(){
    //     //   STTModule.speechToText();
    //     // }, 1800);
    //
    //   }
    //
    //
    // }
    // if(data.context.status === 'listening'){
    //
    //   if(action === 'watson'){
    //
    //     console.log('Watson listeing');
    //     setTimeout(function(){
    //       STTModule.speechToText();
    //     }, 1000);
    //
    //   }
    //   else{
    //         cmds.returnCmd(action);
    //
    //       }
            // else if(action === 'home'){
            //
            //   console.log('G53 X0 Y0 Z0 F800');
            //   setTimeout(function(){
            //     STTModule.speechToText();
            //   }, 1800);
            //
            // }else if(action === 'warm'){
            //   console.log('G53 X100 Y100 Z100 F1200');
            //   setTimeout(function(){
            //     STTModule.speechToText();
            //   }, 1800);
            // }
            // else{
            //   // will start watson listeining again
            //   console.log('Cmd not recognized or not preluded with Watson prompt!');
            //   setTimeout(function(){
            //     STTModule.speechToText();
            //   }, 1500);
            // }

    // }else if(data.context.status === 'off'){
    //   //if status of context = off, then will stop loop from calling sst
    //   console.log('Watson going to sleep');
    //
    // }else{
    //   console.log('Not recognized');
    //   // setTimeout(function(){
    //   //   STTModule.speechToText();
    //   // }, 1800);
    // }


    if (data && !data.output.error) {
      // Check if message is handled by retrieve and rank and there is no message set
      if (action && !data.output.text) {
        // TODO add EIR link
        data.output.text = ['I am not able to answer that. You can try asking the'
        + ' <a href="https://conversation-with-discovery.mybluemix.net/" target="_blank">Information Retrieval with Discovery App</a>'];

        Api.setWatsonPayload(data);
        return;
      }



      if (action) {
        let actionArray = getActions(action);
        if (actionArray) {
          for (let i in actionArray) {
            if (actionArray.hasOwnProperty(i)) {
              actionFunctions(actionArray[i]);
            }
          }
        }
      }
    }
  }

  function getActions(action) {
    let res = {};

    let cnt = 0;

    for (let key in action) {
      if (action.hasOwnProperty(key)) {
        res[cnt] = {
          cmd: key,
          arg: action[key]
        };
        cnt++;
      }
    }
    return res;
  }
}());
