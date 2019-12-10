import MobileDetect from 'mobile-detect';
import UserAgentDetecor from './UserAgentDetecor';

export default class MobileDetectUtils {
	public static getMobileDetect(userAgentDetector: UserAgentDetecor) {
		const result: MobileDetect = new MobileDetect(userAgentDetector.userAgentString);
		return result;
	}

	// Function to detect the mobile in use
	// ! call this function in client side(server side doesn't have device)
	public static detectMobileDevice(mobileDetect: MobileDetect, device: 'iPhone') {
		const isDevice: boolean = mobileDetect && mobileDetect.is && mobileDetect.is(device);
		const md: any = mobileDetect;
		const ua: string = md && md.ua ? md.ua : '';
		const mobile: string = md && md._cache && md._cache.mobile ? md._cache.mobile : '';
		if (isDevice || ua.includes(device) || mobile === device) {
			return true;
		}
		return false;
	}
}
