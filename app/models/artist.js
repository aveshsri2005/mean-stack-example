var mongoose = require('mongoose');

var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectID;

var Artist = new Schema({
   name            : { type: String, required: true},
   email           : { type: String, required: true},
   password        : { type: String, required: true},
   accesskey       : { type: String, default: ''},
   shortname       : { type: String, default: '', trim: true},
   reknown         : { type: String, default: '', trim: true},
   bio             : { type: String, default: '', trim: true}
});

module.exports = mongoose.model('Artist', Artist);



/*
function validateThis(v){
    return v == 'mike';
}
 first_name      : { type: String, required: true, trim: true, validate: [validateThis, 'your name isnt mike'] }
*/