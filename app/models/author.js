var mongoose = require('mongoose');

module.exports = mongoose.model('Author', {
   name: {
        type: String,
        default: ''
    },
   email: {
        type: String,
        default: ''
    },
   password: {
        type: String,
        default: ''
    },
    shortname: {
        type: String,
        default: ''
    },
    reknown: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    }
});