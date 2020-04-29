// prePaths consts
const userProfilePath = 'UserProfileImages/';
const conversationImagesPath = 'ConversationImages/';

const Imagespaths = {
	0: undefined,
	1: userProfilePath + 'appaProfilePicture.jpg',
	2: userProfilePath + 'Bastion.jpg',
	3: userProfilePath + 'Dva.jpg',
	4: userProfilePath + 'DvaBunny.jpg',
	5: userProfilePath + 'ForTheAlliance.png',
	6: userProfilePath + 'ForTheHorde.jpg',
	7: userProfilePath + 'Ganji.jpg',
	8: userProfilePath + 'Hamond.jpg',
	9: userProfilePath + 'Hanzo.jpg',
	10: userProfilePath + 'Jaina.jpg',
	11: userProfilePath + 'Junkrat.jpg',
	12: userProfilePath + 'Mcree.jpg',
	13: userProfilePath + 'Mercy.jpg',
	14: userProfilePath + 'Reaper.jpg',
	15: userProfilePath + 'Reinheart.jpg',
	16: userProfilePath + 'Roadhog.jpg',
	17: userProfilePath + 'Simetra.jpg',
	18: userProfilePath + 'Soldier76.jpg',
	19: userProfilePath + 'Zenyata.jpg',
	20: conversationImagesPath + 'appaProfilePicture.jpg',
	21: conversationImagesPath + 'BlackForest.jpg',
	22: conversationImagesPath + 'BlizzardWorld.jpg',
	23: conversationImagesPath + 'Dorado.jpg',
	24: conversationImagesPath + 'Hanamura.jpg',
	25: conversationImagesPath + 'Hollewood.jpg',
	26: conversationImagesPath + 'Ilios.jpg',
	27: conversationImagesPath + 'KingsRow.jpg',
	28: conversationImagesPath + 'OW.jpg',
};

function getImagePath(selection) {
	return Imagespaths[selection];
}

function getUserImages() {
	const imagesUrls = [{0:undefined}];
	for (let i = 1; i < 20; i++) {
		imagesUrls.push({imageNumber:i, imagePath:getImagePath(i)});
	}
	return imagesUrls;
}

function getConversationImages() {
	const imagesUrls = [{0:undefined}];
	for (let i = 20; i < 29; i++) {
		imagesUrls.push({imageNumber:i, imagePath:getImagePath(i)});
	}
	return imagesUrls;
}

module.exports = {
	getImagePath,
	getUserImages,
	getConversationImages,
};
