import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Button, Icon} from 'semantic-ui-react';

interface IProps {
	onClick: any;
}
interface IState {}
export default class BackButtoncomponent extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
	}
	public render() {
		return (
			<div className='back-btn-div' onClick={this.props.onClick}>
				<Icon name='chevron right' autosize='1' className='back-icon' />
				<Button type='button' nomargin='1' normalfont='1' linkbutton='1' whitebackground='1' backbutton='1'>
					<FormattedMessage id='sendGifts.Back' />
				</Button>
			</div>
		);
	}
}
