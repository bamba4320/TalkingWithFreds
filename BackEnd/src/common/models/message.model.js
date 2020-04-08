const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	senderId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
	convId: {type: Schema.Types.ObjectId, ref: 'conversation', required: true},
	messageSendingTime: {type: Date, required: true},
	messageContent: {type: String, required: true},
});

module.exports = mongoose.model('message', MessageSchema);
