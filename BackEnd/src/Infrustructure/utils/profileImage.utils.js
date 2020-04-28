// prePaths consts
const userProfilePath = 'UserProfileImages/';
const conversationImagesPath = 'ConversationImages/';

const Imagespaths = {
	1: userProfilePath + '',
	2: userProfilePath + '',
	3: userProfilePath + '',
	4: userProfilePath + '',
	5: conversationImagesPath + '',
	6: conversationImagesPath + '',
	7: conversationImagesPath + '',
    8: conversationImagesPath + '',
    9: undefined,
};

function getImagePath(selection) {
	return Imagespaths[selection];
}

module.exports = {
	getImagePath,
};
