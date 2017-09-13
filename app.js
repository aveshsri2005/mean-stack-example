// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 5000; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');                       // log every request to the console
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===============================================================
// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)
var promise = mongoose.connect(database.localUrl, {
  useMongoClient: true,
  /* other options */
});
// Or `createConnection`
//var promise = mongoose.createConnection('mongodb://localhost/myapp', {
 // useMongoClient: true,
  /* other options */
//});
promise.then(function(db) {
  /* Use `db`, for instance `db.model()`
});
// Or, if you already have a connection
connection.openUri('mongodb://localhost/myapp', { /* options */ 
});

app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./config/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
