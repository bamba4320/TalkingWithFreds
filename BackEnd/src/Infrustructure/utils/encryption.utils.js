const crypto = require('crypto');
const generateSalt = require('csprng');

/**
 * hash given password with salt
 * @param {String} password
 * @param {String} salt
 */
async function hashPassword(password, salt) {
	try {
		const hash = await crypto
			.createHash('sha256')
			.update(password + salt)
			.digest('hex');
		return hash;
	} catch (err) {
		console.error(err);
		throw new Error(err.message);
	}
}

/**
 * generate new salt for user, after changing password
 */
async function generateNewSalt() {
	try {
		return generateSalt(256, 36);
	} catch (err) {
		console.error(err);
		throw new Error(err.message);
	}
}

/**
 * generate random password
 */
function generateRandomPassword() {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&()?<>';
	for (var i = 0; i < 15; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

module.exports = {
	hashPassword,
  generateNewSalt,
  generateRandomPassword,
};
