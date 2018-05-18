//load extend module
var extend = require('extend');
//load vcapServices
var vcapServices = require('vcap_services');
var config = require('../config/env.json');
var returnCmd = require('/Users/reece.maganzini/Documents/GitHub/watsonCNCcontrol_v3/ui/js/cmds.js');
// console.log(cmds[3]);
//eturnCmd('yay');

var convConfig = extend(config.conversation, vcapServices.getCredentials('conversation'));
//convConfig is object with kv pairs from env.json

  //load conversation module
  var ConversationV1 = require('/Users/reece.maganzini/Documents/GitHub/watsonCNCcontrol_v3/node_modules/watson-developer-cloud/conversation/v1.js');
  //allows prompted input between server and client side
  var prompt = require('prompt-sync')();

  // Set up Conversation service wrapper.
    var conversation = new ConversationV1(
      convConfig
    );
    var workspace_id = convConfig.workspace_id; // replace with workspace ID

module.exports = function(app){
    //Start conversation with empty message.
    conversation.message({
      workspace_id: workspace_id
      }, processResponse);

    // Process the conversation response.
    function processResponse(err, response) {
      //if(response.context.status !== "off")
      let x =1;
        if (err) {
          console.error(err); // something went wrong
          return;
        }
        //conversation service has already been trained to flag recognized commands
        //response.context.isCmd returns true if its a command and undefined if it is not
        if (response.context.isCmd) {
         console.log('------ Command recognized -------');
         //console.log(response.context.cmd);
         returnCmd(response.context.cmd);
         //reset to undefined to prevent sticking
         response.context.isCmd = null;
        }

        if (response.output.text.length != 0) {
          console.log(response.output.text[0]);
        }

        if (response.context.status === "off") {
         console.log('------ stopping recognized -------');
         //reset to undefined to prevent sticking
         //response.context.isCmd = null;
         x = 0;
        }
        if(x === 1){
        //Prompt for the next round of input.
        var newMessageFromUser = prompt('>> ');
        conversation.message({
          workspace_id: workspace_id,
          input: { text: newMessageFromUser },
          context: response.context }, processResponse)

      }
    }//end of processResponse
};
