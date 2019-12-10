import {routesPaths} from 'common/routes/routesPaths.consts';
import Router from 'next/router';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import {Button, Header, Sticky} from 'semantic-ui-react';

interface IStickyComponentProps {
	intl: InjectedIntl;
	isLoggedIn: boolean;
	openRegistrationModal: () => void;
}
interface IStickyComponentState {
	isSticky: boolean;
}
class StickyComponent extends React.Component<IStickyComponentProps, IStickyComponentState> {
	private contextRef = React.createRef();

	constructor(props: IStickyComponentProps) {
		super(props);
		this.state = {
			isSticky: false,
		};
	}

	scrollToContactForm = () => {
		scrollTo(0, (window as any).contactFormOffsetTop.current.offsetTop - 130);
	};

	purchaseOnlineClick = () => {
		if (this.props.isLoggedIn) {
			Router.push(routesPaths.gifts.root);
		} else {
			this.props.openRegistrationModal();
		}
	};

	public render() {
		return (
			<div className={`hide-mobile`} ref={this.contextRef as React.RefObject<HTMLDivElement>}>
				<Sticky
					context={this.contextRef}
					onStick={() => {
						this.setState({isSticky: true});
					}}
					onUnstick={() => {
						this.setState({isSticky: false});
					}}
					className='sticky-height'>
					<div className={`employee-gifts-sticky ${this.state.isSticky ? 'show-sticky' : 'hide-sticky'}`}>
						<div className='sticky-flex'>
							<div>
								<Header as='h2' className='sticky-header'>
									{this.props.intl.formatMessage({id: 'EmployeeGift.employeeGiftsWithQuietMind'})}
								</Header>
							</div>
							<div>
								<Button
									primary
									circular
									noletterspacing='1'
									onClick={() => this.scrollToContactForm()}
									className={'color-white center-button'}>
									{this.props.intl.formatMessage({id: 'EmployeeGift.getPriceProposal'})}
								</Button>
							</div>
						</div>
					</div>
				</Sticky>
			</div>
		);
	}
}

export default StickyComponent;
