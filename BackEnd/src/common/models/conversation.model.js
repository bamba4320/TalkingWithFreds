const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
	convName: {type: String, required: true},
	lastMessage: {type: String, required: false},
	lastMessageTime: {type: Date, required: false},
	lastMessageUser: {type: String, required: false},
	profileImg: {type: String, required: false},
	isGroup: {type: Boolean, required: true},
	messages: [{type: Schema.Types.ObjectId, ref: 'message'}],
	participants: [{type: Schema.Types.ObjectId, ref: 'User'}],
	unseemMessagesAmount: [{type: Number, required: true}],
});

module.exports = mongoose.model('conversation', ConversationSchema);
