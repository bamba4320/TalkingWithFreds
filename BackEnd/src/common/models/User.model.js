const mongoose = require('mongoose');
const Schema = mongoose.Schema();

UserSchema = new Schema({

});

module.exports = mongoose.model('Users', UserSchema);