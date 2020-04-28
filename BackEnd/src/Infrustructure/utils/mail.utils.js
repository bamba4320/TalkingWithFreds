const nodemailer = require('nodemailer');

const serviceMail = {
	user: 'talkingwithfreds2020@gmail.com',
	pass: 'talkingwithfreds',
};

class MailUtils {
	transporter;
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: serviceMail.user,
				pass: serviceMail.pass,
			},
		});
	}

	/**
	 * send mail to recipiants in array
	 * @param {string[]} recipiants
	 * @param {string} content
	 */
	async sendMail(recipiants, content) {
		let recipiantsString = recipiants.join(', ');
		recipiantsString = recipiantsString.splice(recipiantsString.length - 1, 1);
		await this.transporter.sendMail({
			from: '"Talking With Fred\'s Service" <talkingwithfreds2020@gmail.com>',
			to: recipiantsString,
			subject: 'Password Recovery',
			text: content,
		});
	}
}

module.exports = new MailUtils();
