const UserSchema = require('../../common/models/User.model');
const jwtUtils = require('../../Infrustructure/utils/jwt.utils');
const encryptionUtils = require('../../Infrustructure/utils/encryption.utils');
const profileImageUtils = require('../../Infrustructure/utils/profileImage.utils');
const mailUtils = require('../../Infrustructure/utils/mail.utils');

class UserController {
	/**
	 * validate user login info: username validity and hased password validity.
	 * @param {String} email
	 * @param {String} hasedPassword
	 */
	async authenticateLogin(email, password) {
		try {
			// find user with the same email
			const user = await UserSchema.findOne({email: email});
			// hash given password
			const hasedPassword = await encryptionUtils.hashPassword(password, user.salt);
			if (user.passwordHash === hasedPassword) {
				// if passwords matches, generate and return user token.
				const token = await jwtUtils.saveUserToken(user);
				return {id: user._id, username: user.username, email: user.email, profileImage: user.profileImage, token};
			} else {
				throw new Error('Authentication Failed');
			}
		} catch (err) {
			console.error(err);
			throw new Error(err.message);
		}
	}

	/**
	 * validate token and extract user detailes
	 * @param {string jwt} token
	 */
	async getUserDetailsFromToken(token) {
		try {
			return new Promise((resolve, reject) => {
				// decode token and response with two options:
				// The data from the token, or HTTP 403 Error
				jwtUtils
					.verifyToken(token)
					.then((authData) => {
						UserSchema.findOne({_id: authData.id})
							.then((user) => {
								if (token === user.token) {
									resolve(authData);
								} else {
									reject(new Error('Expired token'));
								}
							})
							.catch((err) => {
								reject(err.message);
							});
					})
					.catch((err) => {
						reject(err.message);
					});
			});
		} catch (err) {
			console.error(err);
			throw new Error(err.message);
		}
	}

	/**
	 * Add new user to database
	 * @param {string} username
	 * @param {string} email
	 * @param {string} password
	 */
	async addNewUser(username, email, password) {
		try {
			// Generate new salt for the user
			const salt = await encryptionUtils.generateNewSalt();
			// Hash his password for saving
			const passwordHash = await encryptionUtils.hashPassword(password, salt);
			const newUser = new UserSchema({
				username: username,
				email: email,
				salt: salt,
				passwordHash: passwordHash,
				token: '',
			});
			newUser.save();
		} catch (err) {
			throw new Error(err.message);
		}
	}

	/**
	 * update user details
	 * @param {string} uid
	 * @param {string} newUsername
	 * @param {number} profileImage
	 */
	async updateUser(token, newUsername, profileImage) {
		try {
			return jwtUtils
				.verifyToken(token)
				.then(async (authData) => {
					// Find the user
					const user = await UserSchema.findOne({_id: authData.id});
					//change and save the user details
					user.username = newUsername;
					user.profileImage = profileImageUtils.getImagePath(profileImage);
					return user.save().then((user) => {
						return jwtUtils.saveUserToken(user).then((token) => {
							return {id: user._id, username: user.username, email: user.email, profileImage: user.profileImage, token};
						});
					});
				})
				.catch(() => {
					throw new Error('User Update Falied');
				});
		} catch (err) {
			throw new Error(err.message);
		}
	}

	/**
	 * delete user record from db
	 * @param {string} uid
	 */
	async deleteUser(uid) {
		try {
			await UserSchema.findByIdAndRemove(uid, (err, user) => {
				if (err) {
					console.error(err.message);
				} else {
				}
			});
		} catch (err) {
			console.error(err.message);
			throw new Error(err.message);
		}
	}

	/**
	 * change own user password
	 * @param {string jwt} token
	 * @param {string} oldPassword
	 * @param {string} newPassword
	 */
	async changePassword(token, oldPassword, newPassword) {
		try {
			return new Promise((resolve, reject) => {
				// decode token and response with two options:
				// The data from the token, or HTTP 403 Error
				jwtUtils
					.verifyToken(token)
					.then((authData) => {
						// after token is verified, extract id and find user
						UserSchema.findOne({_id: authData.id}).then((user) => {
							// hash old password, and authenticate it is correct
							encryptionUtils.hashPassword(oldPassword, user.salt).then((hashedPassword) => {
								if (hashedPassword !== user.passwordHash) {
									reject(new Error('Passwords do not match'));
								} else {
									// after varifying passwords, generate new salt and hash the password
									encryptionUtils.generateNewSalt().then((salt) => {
										encryptionUtils.hashPassword(newPassword, salt).then((newPasswordHashed) => {
											// modify fields and save
											user.salt = salt;
											user.passwordHash = newPasswordHashed;
											// create new token and return it
											jwtUtils
												.saveUserToken(user)
												.then((token) => {
													resolve(token);
												})
												.catch((err) => {
													reject(err);
												});
										});
									});
								}
							});
						});
					})
					.catch((err) => {
						reject(err);
					});
			});
		} catch (err) {
			console.error(err);
			throw new Error(err.message);
		}
	}

	// get all users from db part of the requesting user.
	async getFriends(token) {
		try {
			return new Promise((resolve, reject) => {
				jwtUtils
					.verifyToken(token)
					.then(async (authData) => {
						const users = await UserSchema.find({_id: {$not: {$eq: authData.id}}});
						const sendUsers = users.map((user) => {
							return {id: user._id, username: user.username, profileImage: user.profileImage};
						});
						resolve(sendUsers);
					})
					.catch((err) => {
						reject(err);
					});
			});
		} catch (err) {
			console.error(err);
			throw new Error(err.message);
		}
	}

	// get user document by id
	async getUserById(uid) {
		try {
			return await UserSchema.findById(uid);
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async recoverPassword(email) {
		try {
			const user = await UserSchema.findOne({email: email});
			const newPassword = encryptionUtils.generateRandomPassword();
			encryptionUtils.generateNewSalt().then((salt) => {
				encryptionUtils.hashPassword(newPassword, salt).then((newPasswordHashed) => {
					// modify fields and save
					user.salt = salt;
					user.passwordHash = newPasswordHashed;
					// save changes
					user.save().then(() => {
						const mailBody = `Hello there ${user.username}!\nOur services recieved your rquest for a new password.\nYour new password is:\n${newPassword}\n\n\nGo on, login with it!\n REMEMBER! to keep your accound secured hurry up and change your password!!`;
						mailUtils.sendMail([user.email], mailBody);
						
					});
				});
			});
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

module.exports = new UserController();
