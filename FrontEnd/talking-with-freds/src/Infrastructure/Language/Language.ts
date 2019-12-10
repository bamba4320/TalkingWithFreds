import LocalizedStrings from 'react-localization';
import heJson from './he.json';

class Language {
	public strings: any;

	public constructor(languagesObject: any, defaultLang: string) {
		this.strings = new LocalizedStrings(languagesObject);

		this.changeLanguage(defaultLang);
	}

	/**
	 * Gets a string key, returns the found language value -
	 * If not found returns the key itself
	 * @param key
	 * @param formatObjects - array of formatting variables to be replaced in string
	 * @return {string}
	 */
	public format(key: string, ...formatObjects: any[]) {
		let value;
		const item = this.strings[key];

		if (item) {
			value = item;

			if (formatObjects) {
				value = this.strings.formatString(item, formatObjects);
			}
		}

		return value || key;
	}

	/**
	 * Sets the language
	 * @param language
	 */
	public changeLanguage(language: string) {
		this.strings.setLanguage(language);
	}
}

const Lang = new Language({he: heJson}, 'he');

export default Lang;
