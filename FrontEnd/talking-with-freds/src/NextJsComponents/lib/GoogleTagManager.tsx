import React from 'react';

export interface GTMProps {
	gtmId: string;
}

/**
 * script for GoogleTagManager (head)
 * Paste this code as high in the <head> of the page as possible
 */
export const GoogleTagManagerHead = ({gtmId}: GTMProps) => {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
				new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
				j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
				'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
				})(window,document,'script','dataLayer','${gtmId}');`,
			}}
		/>
	);
};

/**
 * script for GoogleTagManager (head)
 * Additionally, paste this code immediately after the opening <body> tag
 */
export const GoogleTagManagerBody = ({gtmId}: GTMProps) => {
	return (
		<noscript>
			<iframe
				dangerouslySetInnerHTML={{
					__html: `
					src='https://www.googletagmanager.com/ns.html?id=${gtmId}'
					height='0'
					width='0'
					style='display:none;visibility:hidden'`,
				}}
			/>
		</noscript>
	);
};
