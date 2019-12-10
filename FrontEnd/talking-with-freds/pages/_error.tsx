import * as React from 'react';
import Lang from 'Infrastructure/Language/Language';

export interface IErrorPageProps {}

export interface IErrorPageState {}

export default class ErrorPage extends React.Component<IErrorPageProps, IErrorPageState> {
	public render() {
		return (
			<div>
				<div>{Lang.format('errorPage.pageNotExist')}</div>
				<a href='/'>{Lang.format('errorPage.rediractToHomePage')}</a>
			</div>
			// Removed these because it wasn't finished and the background was broken
			// <Grid>
			// 	<Grid.Row>
			// 		<Grid.Column width='12'>
			// 			<div>העמוד אינו קיים</div>
			// 			<a href='/'>עבור לדף הבית</a>
			// 		</Grid.Column>
			// 		<Grid.Column style={{width: '50rem', height: '25rem'}} lovebackground='1' />
			// 	</Grid.Row>
			// </Grid>
		);
	}
}
