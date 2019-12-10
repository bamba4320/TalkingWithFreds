// import Document, {Html, Main, NextDocumentContext, NextScript} from 'next/document';
// import NextHeadWithInlineCss from 'NextJsComponents/lib/NextHeadWithInlineCss';
// import React from 'react';


// export default class CustomDocument extends Document {
// 	public static async getInitialProps(ctx: NextDocumentContext) {
// 		const initialProps = await Document.getInitialProps(ctx);
// 		return {...initialProps};
// 	}

// 	public render() {
// 		const props = this.props.__NEXT_DATA__.props.pageProps;
// 		const useReact: boolean = !!props.useReact;
// 		if (useReact) {
// 			// tslint:disable-next-line: no-console
// 			console.warn('===> this pages will use React on client side');
// 		}
// 		const lang: string = (props.meta && props.meta.lang) || 'en';

// 		return (
// 			<Html>
// 				<NextHeadWithInlineCss />
// 				<body>
// 					<Main />
// 					<NextScript />
// 				</body>
// 			</Html>
// 		);
// 	}
// }
