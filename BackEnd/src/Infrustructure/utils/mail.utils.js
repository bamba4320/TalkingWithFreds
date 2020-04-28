const nodemailer = require('nodemailer');

const serviceMail = {
	user: 'talkingwithfreds2020@gmail.com',
	pass: 'talkingwithfreds',
};

class MailUtils {
	transporter;
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'Gmail',
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
	sendMail(recipiants, content) {
		try {
			let recipiantsString = recipiants.join(', ');
			console.log('>>>>>>>>>>>>>>>> sending....');
			return this.transporter.sendMail(
				{
					from: '"Talking With Fred\'s Service" <talkingwithfreds2020@gmail.com>',
					to: recipiantsString,
					subject: 'Password Recovery',
					text: content,
				},
				(err, response) => {
					if (err) {
						throw new Error(err.message);
					} else {
						console.log('>>>>>>>>>>>>>> Sent!', response);
						return true;
					}
				}
			);
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

module.exports = new MailUtils();
