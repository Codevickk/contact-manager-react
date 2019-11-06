import React, { Component } from 'react';
import PageHeader from '../PageHeader';
import Btn from './Btn';
import { connect } from 'react-redux';
import { fetchContactDetails, updateEditContactForm, editContact, resetEditContactForm } from '../../actions';

class EditContact extends Component {
	constructor(props) {
		super(props);
		this.props.resetEditContactForm();
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		this.props.fetchContactDetails({ id });
	}

	onChange(e) {
		let { name, value } = e.target;
		this.props.updateEditContactForm({ name, value });
	}

	onSubmit(e) {
		e.preventDefault();
		const contactID = this.props.match.params.id;
		let { name, email, phoneNumber } = this.props;
		this.props.editContact({ contactID, name, email, phoneNumber });
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

	renderContent() {
		if (this.props.loading) {
			return this.renderUnavailableContent('loading...');
		} else {
			// Loading Finished, but an error occurred
			// The contacts has been fetched successfully
			return this.renderAvailableContent();
		}
	}

	renderUnavailableContent(content) {
		// the contacts are unavailable
		return (
			<div className="contacts-unavailable text-center">
				<p>{content}</p>
			</div>
		);
	}

	renderAvailableContent() {
		return (
			<div>
				{this.renderFormErrors()}
				{this.renderFormSuccess()}
				<form className="edit-contact-form">
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
		);
	}

	render() {
		return (
			<div className="sub-container">
				<PageHeader headerText="Edit Contact" />
				<div className="content-container">{this.renderContent()}</div>
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
	} = state.editContactForm;

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

export default connect(mapStateToProps, {
	fetchContactDetails,
	updateEditContactForm,
	editContact,
	resetEditContactForm
})(EditContact);
