const crypto = require("crypto");
const generateSalt = require("csprng");

/**
 * hash given password with salt
 * @param {String} password
 * @param {String} salt
 */
async function hashPassword(password, salt) {
  try {
    const hash = await crypto
      .createHash("sha256")
      .update(password + salt)
      .digest("hex");
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

module.exports = {
  hashPassword,
  generateNewSalt
};
