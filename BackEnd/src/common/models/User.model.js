const mongoose = require('mongoose');
const Schema = mongoose.Schema();

UserSchema = new Schema({
	email: {type: String, require: true, unique: true},
	username: {type: String, require: true},
	salt: {type: String, require: true},
	passwordHash: {type: String, require: true},
	token: {type: String, require: true},
});

module.exports = mongoose.model('Users', UserSchema);
