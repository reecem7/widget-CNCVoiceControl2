//Gcode

  // module.exports = cmds;

// module.exports = returnCmd

var cmds = (function() {

  var regcmds = [
      {id:1, name: 'home', gCode: 'G53 X0 Y0 Z0 F1800', port: 'TTY USB0', status: 'Loaded'},
      {id:2, name: 'warm', gCode: 'G53 X150 Y12 Z-60 F800', port: 'TTY USB0', status: 'Loaded'},
      {id:3, name: 'x home', gCode: 'G53 X150 Y12 Z-88 F300', port: 'TTY AM0', status: 'Loaded'},
      {id:4, name: 'y home', gCode: 'G53 X150 Y12 Z-94 F300', port: 'TTY AM0', status: 'Loaded'},
      {id:5, name: 'z home', gCode: 'G53 X0 Y0 Z0 F1800', port: 'TTY USB0', status: 'Loaded'},
      {id:6, name: '', gCode: 'G53 X150 Y12 Z-60 F800', port: 'TTY USB0', status: 'Loaded'},
      {id:7, name: '', gCode: 'G53 X150 Y12 Z-88 F300', port: 'TTY AM0', status: 'Loaded'},
      {id:8, name: '', gCode: 'G53 X150 Y12 Z-94 F300', port: 'TTY AM0', status: 'Loaded'},
      {id:21, name: 'Start Position', gCode: 'G53 X150 Y12 Z-60 F800', port: 'TTY USB0', status: 'Loaded'},
      {id:22, name: 'Collet Align', gCode: 'G53 X150 Y12 Z-88 F300', port: 'TTY AM0', status: 'Loaded'},
      {id:23, name: 'Collet Dock', gCode: 'G53 X150 Y12 Z-94 F300', port: 'TTY AM0', status: 'Loaded'}
    ];

  // var ATCcmds = [
  //     {id:1, name: 'home', gCode: 'G53 X0 Y0 Z0 F1800', port: 'TTY USB0', status: 'Loaded'},
  //     {id:2, name: 'Start Position', gCode: 'G53 X150 Y12 Z-60 F800', port: 'TTY USB0', status: 'Loaded'},
  //     {id:3, name: 'Collet Align', gCode: 'G53 X150 Y12 Z-88 F300', port: 'TTY AM0', status: 'Loaded'},
  //     {id:4, name: 'Collet Dock', gCode: 'G53 X150 Y12 Z-94 F300', port: 'TTY AM0', status: 'Loaded'}
  //   ];

    function checkCmd(action){
      // let ATCcmdInfo = [0, {}];
      // ATCcmds.forEach(function(cmd){
      //   if(cmd.name === action ){
      //     ATCcmdInfo = [1, cmd];
      //   }
      // });
      let regcmdInfo = [0, {}];
      regcmds.forEach(function(cmd){
        if(cmd.name === action ){
          regcmdInfo = [1, cmd];
        }
      });

      return regcmdInfo;
    }


  // Publicly accessible methods defined
  return {

    returnCmd: function(action){
      if(checkCmd(action)[0] === 1){
        // console.log('checkCmd returned 1, match');
        console.log(checkCmd(action)[1]);
        // setTimeout(function(){
        //   STTModule.speechToText();
        // }, 1800);
      }
      if(checkCmd(action)[0] === 0){
        // console.log('checkCmd returned 0, no match');
        console.log('Cmd not recognized or not preluded with Watson prompt!');
         // setTimeout(function(){
         //   STTModule.speechToText();
         // }, 1500);

      };
    }
  }

}
());
//
// if(action){
//
//   if(action === 'watson'){
//
//     console.log('Watson listeing');
//     setTimeout(function(){
//       STTModule.speechToText();
//     }, 1800);
//
//   }
//   else if(action === 'home'){
//
//     console.log('G53 X0 Y0 Z0 F800');
//     setTimeout(function(){
//       STTModule.speechToText();
//     }, 1800);
//
//   }else if(action === 'warm'){
//     console.log('G53 X100 Y100 Z100 F1200');
//     setTimeout(function(){
//       STTModule.speechToText();
//     }, 1800);
//   }
//   else{
//     // will start watson listeining again
//     console.log('Cmd not recognized or not preluded with Watson prompt!');
//     setTimeout(function(){
//       STTModule.speechToText();
//     }, 1500);
//   }
//
// }else if(data.context.status === 'off'){
//   //if status of context = off, then will stop loop from calling sst
//   console.log('Watson going to sleep');
//
// }else{
//   console.log('Not recognized');
//   setTimeout(function(){
//     STTModule.speechToText();
//   }, 1500);
// }
