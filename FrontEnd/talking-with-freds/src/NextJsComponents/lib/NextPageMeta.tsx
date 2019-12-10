import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

export interface NextMetaPageOptions {
	meta: {
		title: string;
		lang?: string;
		description?: string;
		robots?: string;
		canonical?: string;
		ogimage?: string;
		favicon?: string;
		manifest?: string;
	};
	useReact?: boolean;
}

const NextMetaPage = (props: NextMetaPageOptions) => {
	return (
		<Head>
			<meta charSet='utf-8' />
			{props.meta.title && <title>{props.meta.title}</title>}
			<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			{props.meta.description && <meta name='description' content={props.meta.description} />}
			{props.meta.robots && <meta name='robots' content={props.meta.robots} />}
			{props.meta.ogimage && <meta property='og:image' content={props.meta.ogimage} />}
			{props.meta.favicon && (
				<>
					<link rel='shortcut icon' href={props.meta.favicon} />
					<link rel='apple-touch-icon' href={props.meta.favicon} />
				</>
			)}
			{props.meta.canonical && <link rel='canonical' href={props.meta.canonical} />}
			{props.meta.manifest && <link rel='manifest' href={props.meta.manifest} />}
		</Head>
	);
};

NextMetaPage.propTypes = {
	meta: PropTypes.object.isRequired,
};

export default NextMetaPage;
