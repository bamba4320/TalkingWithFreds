import React from 'react';

/**
 * Links for css of Accessibility component
 */
export const AccessibilityHeader = () => {
	return (
		<>
			<link rel='stylesheet' href='https://dts.co.il/accessibility/style.css' />
			<link rel='stylesheet' href='https://dts.co.il/accessibility/stylebottomRight.css' />
		</>
	);
};

/**
 * script to run Accessibility component
 */
export const AccessibilityBody = () => {
	return (
		<>
			<script src='https://dts.co.il/accessibility/app.bundle.js' />
		</>
	);
};
