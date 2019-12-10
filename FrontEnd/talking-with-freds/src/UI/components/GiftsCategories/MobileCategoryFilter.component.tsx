import CategoryDTO from 'common/models/DTOs/Category.dto';
import {Component} from 'react';
import {Header, Icon, Menu} from 'semantic-ui-react';

interface IProps {
	handleCategoryChange: any;
	isActive: any;
	categories: CategoryDTO[];
}
interface IState {}

export default class MobileCategoryFiltersComponent extends Component<IProps, IState> {
	constructor(props: Readonly<IProps>) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<Menu vertical fluid mobilefiltermenu='1'>
				{this.props.categories.map((category) => {
					return (
						<Menu.Item
							key={category.categoryId}
							flexitem='1'
							onClick={() => {
								this.props.handleCategoryChange(category.categoryId);
							}}>
							<Header nomargin='1'>
								<Header.Subheader>{category.categoryName ? category.categoryName : ''}</Header.Subheader>
							</Header>
							{this.props.isActive(category.categoryId) && <Icon name='check' color='orange' />}
						</Menu.Item>
					);
				})}
			</Menu>
		);
	}
}
