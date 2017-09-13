var Author = require('../app/models/author');
var Artist = require('../app/models/artist');
var crypto = require('crypto');


module.exports = function (app) {
    app.get('/api/artists', function (req, res) {
        // use mongoose to get all todos in the database
		 Author.find(function (err, authors) {
		        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
		        if (err) {
		            res.send(err);
		        }
		        res.json(authors); // return all todos in JSON format
		    }).limit(1000);
    });
  

   //register artist data
   app.post('/api/signup', function (req, res) {
        // use mongoose to get all todos in the database
        var postData = req.body;
        var encryptedPassword = crypto.createHash('md5').update(postData.password).digest("hex");
        var data = {name:postData.name, email:postData.email, password:encryptedPassword};
        var artistdata = new Artist(data);
        artistdata.save(function (err, artists) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err) {
                    res.send(err);
                }
                res.json({success:true}); // return all todos in JSON format
            });
    });


   //login artist data
   app.post('/api/login', function (req, res) {
        // use mongoose to get all todos in the database
        var sessionId = null;
        var userInfo  = null;
        var postData = req.body;
        var encryptedPassword = crypto.createHash('md5').update(postData.password).digest("hex");
        Artist.find({email:postData.username,password:encryptedPassword}, function (err, artists) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err) {
                    res.send(err);
                }else{
                     sessionId = crypto.randomBytes(16).toString("hex");  
                     Artist.update({email:postData.username}, {accesskey:sessionId}, { multi: false }, function (err) {
                         // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                         if (err) {
                            res.send(err);
                        }  
                        res.json({sessionId: sessionId}); // return session id
                    });
                }   

         });
    });

   //login artist data
   app.post('/api/validate', function (req, res) {
        // use mongoose to get all todos in the database
        var authorized = 'unauthorized';
        var postData = req.body;
        Artist.find({accesskey:postData.sessionId}, function (err, artists) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err) {
                    res.send(err);
                }
                if(artists){  // if user is authorised  
                   var authorized = 'authorized';
                } 
                res.send(authorized);           
         });
    });


   //login artist data
   app.post('/api/logout', function (req, res) {
        // use mongoose to get all todos in the database
        var postData = req.body;  
        Artist.update({accesskey:postData.sessionId}, {accesskey:"logout"}, { multi: false }, function (err) {
                         // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                         if (err) {
                            res.send(err);
                        }  
                        res.send("Logout Successfully.");
         });

    });



    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
       // res.sendFile(__dirname + '/../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
        var path = require('path');
        res.sendFile(path.resolve('public/index.html'));
    });

};