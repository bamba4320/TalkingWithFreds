import EnvConfig from 'Infrastructure/config/env.config';
import Document, {Head, Main, NextDocumentContext, NextScript} from 'next/document';
import {AccessibilityBody, AccessibilityHeader} from 'NextJsComponents/lib/Accessibility';
import {GoogleTagManagerBody, GoogleTagManagerHead} from 'NextJsComponents/lib/GoogleTagManager';
import NextReactIntlScript from 'NextJsComponents/lib/NextReactIntlScript';

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
export default class IntlDocument extends Document {
	public static async getInitialProps(context: NextDocumentContext) {
		const props = await Document.getInitialProps(context);
		const {locale, localeDataScript, gtmId} = context.req as any;
		// const gtmId = siteConfiguration ? siteConfiguration.gtmId : '';

		return {
			...props,
			locale,
			localeDataScript,
			gtmId,
		};
	}

	public render() {
		const {locale, localeDataScript, gtmId} = this.props as any;
		const isProduction = EnvConfig.getAppEnv() === 'production';

		return (
			<html>
				<Head>
					{isProduction && <GoogleTagManagerHead gtmId={gtmId} />}
					<AccessibilityHeader />
				</Head>
				<body>
					{isProduction && <GoogleTagManagerBody gtmId={gtmId} />}
					<Main />
					<NextReactIntlScript locale={locale} localeDataScript={localeDataScript} />
					<NextScript />
					<AccessibilityBody />
				</body>
			</html>
		);
	}
}
