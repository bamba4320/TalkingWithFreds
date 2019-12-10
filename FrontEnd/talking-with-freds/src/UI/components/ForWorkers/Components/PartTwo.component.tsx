import {FORWORKERS_STORE} from 'BL/stores';
import ForWorkersStore from 'BL/stores/ForWorkers.store';
import {ForWorkersMessages} from 'common/generalconsts/messages.consts';
import {routesPaths} from 'common/routes/routesPaths.consts';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Button, Container} from 'semantic-ui-react';
import CustomCategoriesComponent from 'UI/components/custom/CustomCategories/CustomCategories.component';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';
import {checkUndefined} from './utility';

interface IPartTwoComponentProps {
	intl: InjectedIntl;
	messages: ForWorkersMessages;
	imagePlaceholder: string;
	[FORWORKERS_STORE]?: ForWorkersStore;
	imagesPath: string;
}
interface IPartTwoComponentState {}

@inject(FORWORKERS_STORE)
@observer
class PartTwoComponent extends React.Component<IPartTwoComponentProps, IPartTwoComponentState> {
	private forWorkersStore: ForWorkersStore;

	constructor(props: IPartTwoComponentProps) {
		super(props);
		this.forWorkersStore = this.props[FORWORKERS_STORE] as ForWorkersStore;
	}

	public render() {
		const intl: InjectedIntl = this.props.intl as InjectedIntl;
		return (
			<>
				<div className='custom-title-component-override'>
					<CustomTitleComponent
						content={intl.formatMessage({id: 'EmployeeGift.giftsForEveryone'})}
						notMain
						fontszsubheader='1.95rem'
						margin='0 0 16rem 0'>
						{checkUndefined(this.props.messages.part3_text)}
					</CustomTitleComponent>
				</div>
				<CustomCategoriesComponent categories={this.forWorkersStore.getCategories} />
				<Container textAlign='center' className='btn-container'>
					<Link href={routesPaths.gifts.root}>
						<a>
							<Button primary circular className='all-btn max-content' biggerbtn='1'>
								{this.props.intl.formatMessage({id: 'EmployeeGift.toAllNofshonitGifts'})}
							</Button>
						</a>
					</Link>
				</Container>
				<div className='space-40' />
			</>
		);
	}
}

export default withIntl(PartTwoComponent);
