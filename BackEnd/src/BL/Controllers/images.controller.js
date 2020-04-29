const profileImageUtils = require('../../Infrustructure/utils/profileImage.utils');

function getUserProfileImages() {
	return profileImageUtils.getUserImages();
}

function getCovnersationsImages() {
	return profileImageUtils.getConversationImages();
}

function getAllImages() {
	return {user: getUserProfileImages(), conversations: getCovnersationsImages()};
}

module.exports = {
	getAllImages,
	getCovnersationsImages,
	getUserProfileImages,
};
