import hoistNonReactStatics from 'hoist-non-react-statics';
import {injectIntl} from 'react-intl';

export const hoistStatics = (higherOrderComponent: any) => (BaseComponent: any) => {
	const NewComponent = higherOrderComponent(BaseComponent);
	hoistNonReactStatics(NewComponent, BaseComponent);
	return NewComponent;
};

export default hoistStatics(injectIntl);
