import TagDTO from 'common/models/DTOs/Tag.dto';
import React from 'react';
import {InjectedIntl} from 'react-intl';
import withIntl from 'ReactIntlComponents/withIntl';
import {Image} from 'semantic-ui-react';
import CustomTagscomponent from 'UI/components/custom/CustomSliderAndTags/CustomTags.component';
import CustomTitleComponent from 'UI/components/custom/customTitle/CustomTitle.component';

interface IPartThreeComponentProps {
	intl: InjectedIntl;
	imagePlaceholder: string;
	mobileDetect: MobileDetect;
	imagesPath: string;
	tags: TagDTO;
}
interface IPartThreeComponentState {}

class PartThreeComponent extends React.Component<IPartThreeComponentProps, IPartThreeComponentState> {
	constructor(props: IPartThreeComponentProps) {
		super(props);
	}

	public render() {
		const topTag = this.props.tags;
		return (
			<>
				<div className='employee-gifts-overide-tags-header'>
					<CustomTitleComponent content={topTag ? topTag.tagName : ''} notMain margin='0 0 16rem 0' />
				</div>
				<div className='tag-image-container'>
					<Image src='/static/images/xbox.png' className='cat-img' />
				</div>
				<CustomTagscomponent
					mobileDetect={this.props.mobileDetect}
					intl={this.props.intl}
					imagesPath={this.props.imagesPath}
					tags={topTag}
				/>
				<div className='hide-desktop'>
					<div className='employee-gifts-divider' />
					<div className='space-40' />
				</div>
			</>
		);
	}
}

export default withIntl(PartThreeComponent);
