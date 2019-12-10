export default class BrowserUtils {
	public static detectBrowser(agent: string) {
		switch (true) {
			case agent.indexOf('edge') > -1:
				return 1; // edge
			case agent.indexOf('edg') > -1:
				return 2; // chromium based edge (dev or canary)
			case agent.indexOf('opr') > -1 && !!(window as any).opr:
				return 3; // opera
			case agent.indexOf('chrome') > -1 && !!(window as any).chrome:
				return 4; // chrome
			case agent.indexOf('trident') > -1:
				return 5; // ie
			case agent.indexOf('firefox') > -1:
				return 6; // firefox
			case agent.indexOf('safari') > -1:
				return 7; // safari
			default:
				return -1; // other
		}
	}
}
