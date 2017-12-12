var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/twilio_app');

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open!');
});

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});