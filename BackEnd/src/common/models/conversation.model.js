const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
	convName: {type: String, required: true},
	lastMessage: {type: String, required: false},
	lastMessageTime: {type:Date, required:false},
	profileImg: {type: String, required: false},
	isGroup: {type: Boolean, required: true},
	messages: [{type: Schema.Types.ObjectId, ref: 'message'}],
	participants: [{type: Schema.Types.ObjectId, ref: 'User'}],
	admin: {type: Schema.Types.ObjectId, ref: 'User', required: false},
});

module.exports = mongoose.model('conversation', ConversationSchema);
