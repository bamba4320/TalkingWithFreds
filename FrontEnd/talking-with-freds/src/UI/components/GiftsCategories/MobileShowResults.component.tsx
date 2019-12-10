import {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Button, Segment} from 'semantic-ui-react';

interface IProps {
	handleFilterSearch: any;
	handleCleanQuery: any;
}
interface IState {}

export default class MobileShowResultsComponent extends Component<IProps, IState> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<Segment placeholder rowflexsegment='1' spacebetween='1' mobilefiltersegment='1'>
				<Button primary circular showresults='1' onClick={this.props.handleFilterSearch}>
					<FormattedMessage id='general.ShowResults' />
				</Button>
				<Button linkbutton='1' whitebackground='1' onClick={this.props.handleCleanQuery}>
					<FormattedMessage id='general.Clean' />
				</Button>
			</Segment>
		);
	}
}
