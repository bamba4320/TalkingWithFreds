import OptionsDTO from '../DTOs/Options.dto';
export default class ContactUsConverter {
	public static optionToOptionsDto(text: string, value: number): OptionsDTO {
		const converted: OptionsDTO = new OptionsDTO(value, text);
		return converted;
	}
	public static ArrayToOptionDto(array: Array<{crmTypeID: number; crmTypeDescription: string}>) {
		if (array && array.length > 0) {
			return array.map(({crmTypeID, crmTypeDescription}) => this.optionToOptionsDto(crmTypeDescription, crmTypeID));
		}

		return [];
	}
}
