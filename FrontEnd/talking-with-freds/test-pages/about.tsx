import {LayoutPageOptions} from 'common/generalconsts/pageOptions.enums';
import HowToUseContainer from 'UI/containers/HowToUse/HowToUse.container';

const About = () => {
	return <HowToUseContainer />;
};

About.getInitialProps = async () => {
	return {
		[LayoutPageOptions.withoutFooter]: true,
	};
};

export default About;
