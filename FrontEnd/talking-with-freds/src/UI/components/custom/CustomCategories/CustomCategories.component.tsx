import CategoryDTO from 'common/models/DTOs/Category.dto';
import {routesPaths} from 'common/routes/routesPaths.consts';
import {observer} from 'mobx-react';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Grid, Header, Image, Segment} from 'semantic-ui-react';
import CustomIdLinkComponent from 'UI/components/custom/customLink/CustomIdLink.component';

interface IPartTwoComponentProps {
	intl: InjectedIntl;
	categories: CategoryDTO[];
}
interface IPartTwoComponentState {}

@observer
class CustomCategories extends React.Component<IPartTwoComponentProps, IPartTwoComponentState> {
	constructor(props: IPartTwoComponentProps) {
		super(props);
	}

	public renderCategories() {}

	public render() {
		const intl: InjectedIntl = this.props.intl as InjectedIntl;
		const categories = this.props.categories
			? this.props.categories.map((category) => {
					const imageFile = category.images && category.images[0] && category.images[0].file && category.images[0].file;
					return (
						<Grid.Column
							widescreen={4}
							largeScreen={4}
							computer={5}
							tablet={8}
							mobile={8}
							key={category.categoryId}
							className='categories-grid-column'>
							<CustomIdLinkComponent
								pathname={routesPaths.gifts.root}
								id={category.categoryId ? category.categoryId : ''}>
								<Image
									src={imageFile ? imageFile : '/static/placeholders/image-placeholder.png'}
									alt={
										category.images && category.images.length > 0 && category.images[0] ? category.images[0].alt : ''
									}
									centered
									circular
									className='categories-image'
								/>
								<Header dropdownitemheader='1' textcentered='1' categoriesfont='1' className='categories-header'>
									{category.categoryName}
								</Header>
							</CustomIdLinkComponent>
						</Grid.Column>
					);
			  })
			: [];
		if (categories.length === 0) {
			return (
				<Segment placeholder>
					<Header size='huge' color='grey'>
						{intl.formatMessage({id: 'navbar.NoCategoriesFound'})}
					</Header>
				</Segment>
			);
		} else {
			return <Grid className='categories-grid'>{categories}</Grid>;
		}
	}
}

export default withIntl(CustomCategories);
