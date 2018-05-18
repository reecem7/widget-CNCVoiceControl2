//might not need this if all is done in app.js

require('dotenv').config({silent: true});

var server = require('./app');
var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

server.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/ui/index.html'));
  //__dirname : It will resolve to your project folder.
});
