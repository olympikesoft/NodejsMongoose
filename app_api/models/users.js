var mongoose = require('mongoose');

var Users = new mongoose.Schema({
    name: String/*,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean
   /* location: String,
    meta: {
      age: Number,
      website: String,
      facebook_id: String,
      linkedin_url : String, 
    },
    image: Buffer,
    created_at: Date,
    updated_at: Date*/
});


module.exports = mongoose.model('User', Users);
