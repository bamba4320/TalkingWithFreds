export default class OptionsDTO {
	public value: number = 0;

	public text: string = '';

	public disabled: boolean = false;

	constructor(value: number, text: string, disabled?: boolean) {
		this.value = value;
		this.text = text;
		this.disabled = disabled ? disabled : false;
	}
}
