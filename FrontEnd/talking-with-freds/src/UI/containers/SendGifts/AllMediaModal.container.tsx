import {PURCHASE_STORE} from 'BL/stores';
import PurchaseStore from 'BL/stores/Purchase.store';
import BlessingMediaDTO from 'common/models/DTOs/BlessingMedia.dto';
import _ from 'lodash';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {FormattedMessage, InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Header, Icon, Search, Segment} from 'semantic-ui-react';
import MediaCarouselComponent from 'UI/components/SendGifts/MediaCarousel.component';

interface IProps {
	intl?: InjectedIntl;
	isMobile: boolean;
	[PURCHASE_STORE]?: PurchaseStore;
	onImageClick: any;
}

interface IState {
	results: {};
	searched: string;
}

@inject(PURCHASE_STORE)
@observer
class AllMediaModalContainer extends Component<IProps, IState> {
	public intl: InjectedIntl;
	private purchaseStore: PurchaseStore;
	private defaultSearchText: string;
	private source: Array<{title: string}>;
	constructor(props: IProps) {
		super(props);
		this.intl = this.props.intl as InjectedIntl;
		this.purchaseStore = this.props[PURCHASE_STORE] as PurchaseStore;
		this.defaultSearchText = this.intl.formatMessage({id: 'sendGifts.SearchByBlessingCategory'});
		this.source = this.purchaseStore.getBlessingsMedia.map((mediaDto) => {
			return {title: mediaDto.mediaCategoryName};
		});
		this.state = {
			results: {},
			searched: '',
		};
	}

	public componentDidMount() {
		this.purchaseStore.setSearchText(this.defaultSearchText);
	}

	public render() {
		const resultRenderer = ({title}: {title: string}) => <Header size='tiny' content={title} />;

		// if they didnt searched any thing then it shows all the media
		const mediaResults = !this.state.searched
			? this.purchaseStore.getBlessingsMedia.map((BlessingMediaDto) => {
					return this.carouselRow(this.props.isMobile, this.props.onImageClick, BlessingMediaDto);
			  })
			: this.handleRenderSingleResultCarouselRow();

		return (
			<Segment placeholder nopadding='1' className='all-media-modal-container'>
				<div className='search-wrapper-div'>
					<Search
						noResultsMessage={
							<FormattedMessage id='sendGifts.NoResult' values={{subject: this.purchaseStore.getSearchText}} />
						}
						size='big'
						className='seacrh-container'
						icon={<Icon name='search' className='search-icon' />}
						onSearchChange={(_e, data) => {
							this.purchaseStore.setSearchText(data.value!);
							const re = new RegExp(_.escapeRegExp(data.value), 'i');
							const isMatch = (result: {title: string}) => re.test(result.title);
							this.setState({
								results: _.filter(this.source, isMatch),
							});
						}}
						onBlur={(_e, data) => {
							if (!data.value) {
								this.purchaseStore.setSearchText(this.defaultSearchText);
							}
						}}
						onFocus={(_e, data) => {
							if (data.value === this.defaultSearchText) {
								this.purchaseStore.setSearchText('');
							}
						}}
						value={this.purchaseStore.getSearchText}
						onResultSelect={this.handleResultSelect}
						results={this.state.results}
						resultRenderer={resultRenderer}
					/>
					{this.purchaseStore.getSearchText !== '' && this.purchaseStore.getSearchText !== this.defaultSearchText && (
						<Icon
							onClick={() => {
								this.purchaseStore.setSearchText(this.defaultSearchText);
								this.setState({searched: ''});
							}}
							name='x'
							cursorpointer='1'
							className='x-icon'
							disabled={
								this.purchaseStore.getSearchText === '' || this.purchaseStore.getSearchText === this.defaultSearchText
							}
						/>
					)}
				</div>
				{mediaResults}
			</Segment>
		);
	}

	private handleResultSelect = (_e: any, {result}: {result: {title: string}}) => {
		this.setState({searched: result.title});
		this.purchaseStore.setSearchText(result.title);
	};

	private carouselRow = (isMobile: boolean, onImageClick: any, blessingMediaDto: BlessingMediaDTO) => {
		const carouselBreakPoints = [
			{width: 1, itemsToShow: 2.2},
			{width: 450, itemsToShow: 2.5},
			{width: 600, itemsToShow: 3.5},
			{width: 700, itemsToShow: 5.5},
			{width: 1024, itemsToShow: 4},
		];
		return (
			<div key={blessingMediaDto.mediaCategoryName}>
				<Header marginauto='1' size='large' fitcontent='1' textcentered='1' mediaheaderpadding='1'>
					{blessingMediaDto.mediaCategoryName}
				</Header>
				<MediaCarouselComponent
					fromWhere={`all_media_${blessingMediaDto.mediaCategoryName}`}
					onImageClick={onImageClick}
					blessingMedia={blessingMediaDto}
					itemsToShow={isMobile ? 2 : 4}
					isMobile={isMobile}
					breakPoints={carouselBreakPoints}
				/>
			</div>
		);
	};

	private handleRenderSingleResultCarouselRow = () => {
		const blessingMediaDtoToRender = this.purchaseStore.getBlessingsMedia.find((BlessingMediaDto) => {
			return BlessingMediaDto.mediaCategoryName === this.state.searched;
		})!; // this must have a value becuase the call to this happens after the user clicks a result

		return this.carouselRow(this.props.isMobile, this.props.onImageClick, blessingMediaDtoToRender);
	};
}

export default withIntl(AllMediaModalContainer);
