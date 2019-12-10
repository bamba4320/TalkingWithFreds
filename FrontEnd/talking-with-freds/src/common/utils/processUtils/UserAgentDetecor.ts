import {NextAppContext} from 'next/app';

// UserAgent string for bots via
// https://stackoverflow.com/questions/20084513/detect-search-crawlers-via-javascript
const botUserAgentString: RegExp = /bot|googlebot|crawler|spider|robot|crawling/;

export default class UserAgentDetecor {
	public static createUserAgent(appContext: NextAppContext) {
		if (appContext && appContext.ctx && appContext.ctx.req) {
			const req = appContext.ctx.req;
			if (req.headers && req.headers['user-agent']) {
				const userAgentDetecor = new UserAgentDetecor(req.headers['user-agent']);
				return userAgentDetecor;
			}
		} else {
			const userAgentDetecor = new UserAgentDetecor(window.navigator.userAgent);
			return userAgentDetecor;
		}
	}

	public userAgentString: string;

	constructor(userAgent: string) {
		this.userAgentString = userAgent;
	}

	public shouldLazyLoad() {
		if (botUserAgentString.test(this.userAgentString)) {
			return false;
		}
		return true;
	}
}
