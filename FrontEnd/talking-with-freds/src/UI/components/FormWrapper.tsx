import {Formik} from 'formik';
import React from 'react';

interface Props {
	initialValues: any;
	validationSchema: any;
	onSubmit: any;
}

interface IState {}

class FormWrapper extends React.Component<Props, IState> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	public render() {
		return (
			<Formik
				initialValues={this.props.initialValues}
				validationSchema={this.props.validationSchema}
				onSubmit={this.props.onSubmit}>
				{/* 'this.props.children' = The form that will be wrapped */}
				{this.props.children}
			</Formik>
		);
	}
}

export default FormWrapper;
