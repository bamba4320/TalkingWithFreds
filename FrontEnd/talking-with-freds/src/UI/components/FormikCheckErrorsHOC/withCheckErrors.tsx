import React from 'react';

export default function withCheckErrors(WrappedComponent: any) {
	return class ReactComponentWithCheckFormErrors extends React.Component {
		constructor(props: any) {
			super(props);
		}
		public render() {
			return <WrappedComponent {...this.props} checkErros={this.checkErros} />;
		}

		private checkErros = () => {
			const errors = document.getElementsByClassName('error');
			let firstrealItem: HTMLElement;
			setTimeout(() => {
				for (let i = 0; i < errors.length; i++) {
					if (!firstrealItem && (errors[i] as HTMLElement).getBoundingClientRect().height !== 0) {
						firstrealItem = errors[i] as HTMLElement;
					}
				}
				if (firstrealItem) {
					firstrealItem.scrollIntoView({behavior: 'smooth', block: 'center'});
				}
			}, 200);
		};
	};
}
