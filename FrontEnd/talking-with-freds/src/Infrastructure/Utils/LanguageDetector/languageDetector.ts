export default class LanguageDetector {
	static ltrChars =
		'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' +
		'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
	static rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';

	public static isRTL(s: string): boolean {
		var rtlDirCheck = new RegExp('^[^' + LanguageDetector.ltrChars + ']*[' + LanguageDetector.rtlChars + ']');

		return rtlDirCheck.test(s);
	}

	public static findFirstNonSpecialChar(s: string) {
		console.log('s:' + s);
		let found = -1;
		const regCheck = new RegExp('^[^' + LanguageDetector.ltrChars + LanguageDetector.rtlChars + ']$');
		for (let i = 0; i < s.length && found !== -1; i++) {
			if (!regCheck.test(s[i])) {
				found = i;
			}
		}
		return found;
	}
}
