import React, { Component } from 'react';
import PageHeader from '../PageHeader';
import Btn from './Btn';
import { connect } from 'react-redux';
import { updateAddContactForm, addContact, resetAddContactForm } from '../../actions';

class AddNewContact extends Component {
	constructor(props) {
		super(props);
		this.props.resetAddContactForm();
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		let { name, value } = e.target;
		this.props.updateAddContactForm({ name, value });
	}

	onSubmit(e) {
		e.preventDefault();
		let { name, email, phoneNumber } = this.props;
		this.props.addContact({ name, email, phoneNumber });
	}

	renderInputErrors(content) {
		return <div className="invalid-feedback">{content}</div>;
	}

	renderFormErrors(input) {
		switch (input) {
			case 'name':
				if (this.props.nameErrors) {
					// there are errors in the name field
					return this.renderInputErrors(this.props.nameErrors.map((error) => error));
				}
				break;

			case 'email':
				if (this.props.emailErrors) {
					// there are errors in the email field
					return this.renderInputErrors(this.props.emailErrors.map((error) => error));
				}
				break;

			case 'phoneNumber':
				if (this.props.phoneNumberErrors) {
					// there are errors in the phoneNumber field
					return this.renderInputErrors(this.props.phoneNumberErrors.map((error) => error));
				}
				break;

			default:
				if (this.props.otherErrors) {
					// render other errors that might occur
					return (
						<div className="alert alert-danger" role="alert">
							{this.props.otherErrors}
						</div>
					);
				}
		}
	}

	renderFormSuccess() {
		if (this.props.success) {
			return (
				// show success message
				<div className="alert alert-success" role="alert">
					{this.props.success}
				</div>
			);
		}
	}

	render() {
		return (
			<div className="sub-container">
				<PageHeader headerText="Add New Contact" />
				<div className="content-container">
					{this.renderFormErrors()}
					{this.renderFormSuccess()}
					<form className="add-contact-form">
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className={`form-control ${this.props.nameErrors ? 'is-invalid' : ''}`}
								id="name"
								placeholder="Name"
								name="name"
								onChange={this.onChange}
								value={this.props.name}
							/>
							{this.renderFormErrors('name')}
						</div>
						<div className="form-group">
							<label htmlFor="password">Email</label>
							<input
								type="email"
								className={`form-control ${this.props.emailErrors ? 'is-invalid' : ''}`}
								id="email"
								placeholder="Email"
								name="email"
								onChange={this.onChange}
								value={this.props.email}
							/>

							{this.renderFormErrors('email')}
						</div>
						<div className="form-group">
							<label htmlFor="password">Phone Number</label>
							<input
								type="number"
								className={`form-control ${this.props.phoneNumberErrors ? 'is-invalid' : ''}`}
								id="phoneNumber"
								placeholder="Phone Number"
								name="phoneNumber"
								onChange={this.onChange}
								value={this.props.phoneNumber}
							/>

							{this.renderFormErrors('phoneNumber')}
						</div>

						<button
							type="submit"
							className="btn submit-btn"
							onClick={this.onSubmit}
							disabled={this.props.loading}
						>
							{this.props.loading ? 'Please Wait...' : 'Submit'}
						</button>
					</form>
				</div>
				<Btn />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const {
		name,
		email,
		phoneNumber,
		loading,
		nameErrors,
		emailErrors,
		phoneNumberErrors,
		otherErrors,
		success
	} = state.addContactForm;

	return {
		name,
		email,
		phoneNumber,
		loading,
		nameErrors,
		emailErrors,
		phoneNumberErrors,
		otherErrors,
		success
	};
};

export default connect(mapStateToProps, { updateAddContactForm, addContact, resetAddContactForm })(AddNewContact);
