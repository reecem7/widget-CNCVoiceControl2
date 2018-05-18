

let ManualInit = function(){
  console.log('conversation service innited');
  Api.initConversation(); // Load initial Watson greeting after overlays are gone.
  // function hideOverlays() {
  //   var darkOverlay = document.getElementById(ids.darkOverlay);
  //   var clearOverlay = document.getElementById(ids.clearOverlay);
  //   Common.addClass(darkOverlay, classes.hide);
  //   Common.addClass(clearOverlay, classes.hide);
  // }
  // hideOverlays();
  Conversation.focusInput();
  // STTModule.micON();
}
