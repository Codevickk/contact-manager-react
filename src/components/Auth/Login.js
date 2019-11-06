import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../PageHeader';
import './Auth.css';
import { resetLoginForm, updateLoginForm, login } from '../../actions';
import { Redirect, Link } from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);
		this.props.resetLoginForm();
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		let { name, value } = e.target;
		this.props.updateLoginForm({ name, value });
	}

	onSubmit(e) {
		e.preventDefault();
		let { username, password } = this.props;
		this.props.login({ username, password });
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

	render() {
		// Check if the user is already authenticated and redirect them
		const authenticated = localStorage.getItem('token');
		const { from } = this.props.location.state || { from: { pathname: '/' } };
		if (authenticated) {
			return <Redirect to={from} />;
		}

		return (
			<div className="sub-container">
				<PageHeader headerText="Login" />
				<div className="content-container auth-container">
					{this.renderFormErrors()}
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
						You do not have an account?, Register <Link to="/register">here</Link>
					</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { username, password, loading, usernameErrors, passwordErrors, otherErrors } = state.loginForm;

	return {
		username,
		password,
		loading,
		usernameErrors,
		passwordErrors,
		otherErrors
	};
};

export default connect(mapStateToProps, { updateLoginForm, login, resetLoginForm })(Login);
