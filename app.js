//main entry point for app
//dotenv needs to be loaded before the watson services
require('dotenv').config({silent: true});

    const express = require('express');

    const app = express();
    //map for static files loaded in HTML
    app.use(express.static(__dirname + '/ui/'));

    //load conversationRouter from router.js
      require('./config/express')(app);

      require('./routes/conversation.js')(app);
      require('./routes/speech-to-text')(app);
      require('./routes/text-to-speech')(app);
      // require('./ui/css/main.css');
      require('./config/error-handler')(app);

      // module.exports = app; //export to server.js if want to init using it, I inited the port and loaded dotenv all in app.js for this case

    app.get('/',function(req,res){
      // console.log(req.originalUrl); // '/'

      res.sendFile(path.join(__dirname + '/ui/index.html'));
      //__dirname : It will resolve to your project folder.
    });
    // const PORT = 3000;
    // app.listen(PORT);
    // console.log("Running at Port 3000");
    var port = process.env.PORT || process.env.VCAP_APP_PORT || 3001;
    app.listen(port, function() {
      // eslint-disable-next-line
      console.log('Server running on port: %d', port);
    });
