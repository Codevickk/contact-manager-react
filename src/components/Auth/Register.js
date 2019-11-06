import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Auth.css';
import { updateRegisterForm, register, resetRegisterForm } from '../../actions';
import { Redirect, Link } from 'react-router-dom';
import PageHeader from '../PageHeader';

class Register extends Component {
	constructor(props) {
		super(props);
		this.props.resetRegisterForm();
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		let { name, value } = e.target;
		this.props.updateRegisterForm({ name, value });
	}

	onSubmit(e) {
		e.preventDefault();
		let { username, password } = this.props;
		this.props.register({ username, password });
	}

	renderInputErrors(content) {
		return <div className="invalid-feedback">{content}</div>;
	}

	renderFormErrors(input) {
		if (input === 'username') {
			// render the username field errors if there is any
			if (this.props.usernameErrors) {
				return this.renderInputErrors(this.props.usernameErrors.map((error) => error));
			}
		} else if (input === 'password') {
			// render the password field errors if there is any
			if (this.props.passwordErrors) {
				return this.renderInputErrors(this.props.passwordErrors.map((error) => error));
			}
		} else {
			// Custom errors
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
					{this.props.success}, you can login <Link to="/login">here</Link>
				</div>
			);
		}
	}

	render() {
		// Check if the user is already authenticatec and redirect them
		const authenticated = localStorage.getItem('token');
		const { from } = this.props.location.state || { from: { pathname: '/' } };
		if (authenticated) {
			return <Redirect to={from} />;
		}

		return (
			<div className="sub-container">
				<PageHeader headerText="Register" />
				<div className="content-container auth-container">
					{this.renderFormErrors()}
					{this.renderFormSuccess()}
					<form className="auth-form">
						<div className="form-group">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								className={`form-control ${this.props.usernameErrors ? 'is-invalid' : ''}`}
								id="username"
								aria-describedby="usernameHelp"
								placeholder="Enter username"
								name="username"
								onChange={this.onChange}
								value={this.props.username}
							/>

							{this.renderFormErrors('username')}
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								className={`form-control ${this.props.passwordErrors ? 'is-invalid' : ''}`}
								id="password"
								placeholder="Password"
								name="password"
								onChange={this.onChange}
								value={this.props.password}
							/>

							{this.renderFormErrors('password')}
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

					<p className="auth-info">
						Already have an account?, Login <Link to="/login">here</Link>
					</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { username, password, loading, usernameErrors, passwordErrors, otherErrors, success } = state.registerForm;

	return {
		username,
		password,
		loading,
		usernameErrors,
		passwordErrors,
		otherErrors,
		success
	};
};

export default connect(mapStateToProps, { updateRegisterForm, register, resetRegisterForm })(Register);
