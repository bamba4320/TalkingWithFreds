const UserSchema = require('../../common/models/User.model');
const crypto = require('crypto');
const generateSalt = require('csprng');
const jwt = require('jsonwebtoken');

class UserController {
	/**
	 * get the user salt from record
	 * @param {String} email
	 */
	async getUserSalt(email) {
		try {
			const user = await UserSchema.findOne({email: email});
			if (user) {
				return user.salt;
			} else {
				throw new Error('User not found');
			}
		} catch (err) {
			console.error(err);
			throw new Error('User not found');
		}
	}

	/**
	 * hash given password by user salt, if username correct
	 * @param {String} password
	 * @param {String} email
	 */
	async hashUserPassword(password, email) {
		try {
			const salt = await this.getUserSalt(email);
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
	 * hash given password with salt
	 * @param {String} password
	 * @param {String} salt
	 */
	async hashPassword(password, salt) {
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
	async generateSalt() {
		try {
			return generateSalt(256, 36);
		} catch (err) {
			console.error(err);
			throw new Error(err.message);
		}
	}

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
			const hasedPassword = await this.hashUserPassword(password, email);
			if (user.passwordHash === hasedPassword) {
				// if passwords matches, generate and return user token.
				return new Promise((resolve, reject) => {
					this.saveUserToken(user)
						.then((token) => {
							resolve(token);
						})
						.catch((err) => {
							reject(err);
						});
				});
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
				jwt.verify(token, 'test-secret-key', (err, authData) => {
					if (err) {
						console.error(err);
						reject(err);
					} else {
						// check if token is valid with the user
						UserSchema.findOne({_id: authData.id}).then((user) => {
							if (token === user.token) {
								resolve(authData);
							} else {
								reject(new Error('Expired token'));
							}
						});
					}
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
			const salt = await this.generateSalt();
			// Hash his password for saving
			const passwordHash = await this.hashPassword(password, salt);
			const newUser = new UserSchema({
				username: username,
				email: email,
				salt: salt,
				passwordHash: passwordHash,
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
	 * @param {string} newPassword
	 */
	async updateUser(uid, newUsername, newPassword) {
		try {
			// Find the user
			const user = await UserSchema.findOne({_id: uid});
			// After finding a user, generate new salt for him
			const salt = await this.generateSalt();
			// Hash the new password
			const passwordHash = await this.hashPassword(newPassword, salt);
			//change and save the user details
			user.username = newUsername;
			user.passwordHash = passwordHash;
			user.salt = salt;
			this.saveUserToken(user);
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
			await UserSchema.deleteOne({_id: uid});
		} catch (err) {
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
				jwt.verify(token, 'test-secret-key', (err, authData) => {
					if (err) {
						reject(err);
					} else {
						// after token is verified, extract id and find user

						UserSchema.findOne({_id: authData.id}).then((user) => {
							// hash old password, and authenticate it is correct
							this.hashPassword(oldPassword, user.salt).then((hashedPassword) => {
								if (hashedPassword !== user.passwordHash) {
									reject(new Error('Passwords do not match'));
								} else {
									// after varifying passwords, generate new salt and hash the password
									this.generateSalt().then((salt) => {
										this.hashPassword(newPassword, salt).then((newPasswordHashed) => {
											// modify fields and save
											user.salt = salt;
											user.passwordHash = newPasswordHashed;
											// create new token and return it
											this.saveUserToken(user)
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
					}
				});
			});
		} catch (err) {
			console.error(err);
			throw new Error(err.message);
		}
	}

	/**
	 * save user token to db and return token
	 * @param {Document} user
	 */
	async saveUserToken(user) {
		try {
			return new Promise((resolve, reject) => {
				jwt.sign(
					{
						id: user._id,
						email: user.email,
						username: user.username,
					},
					'test-secret-key',
					{expiresIn: '5h'},
					async function(err, token) {
						if (err) {
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
}

module.exports = new UserController();
