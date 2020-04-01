const jwt = require('jsonwebtoken');
const secretKey = 'test-secret-key';

/**
 * save user token
 */
async function saveUserToken(user) {
	try {
		return new Promise((resolve, reject) => {
			jwt.sign(
				{
					id: user._id,
					email: user.email,
					username: user.username,
				},
				secretKey,
				{expiresIn: '5h'},
				async function(err, token) {
					if (err) {
            console.error(err);
						reject(err);
					}
					user.token = token;
					user.save();
					resolve(token);
				}
			);
		});
	} catch (err) {
		throw new Error(err.message);
	}
}

async function verifyToken(token) {
;	return new Promise((resolve, reject) => {
		jwt.verify(token, secretKey, (err, authData) => {
			if (err) {
        console.error(err);
				reject(err);
			} else {
				resolve(authData);
			}
		});
	});
}

module.exports = {
	saveUserToken,
	verifyToken,
};
