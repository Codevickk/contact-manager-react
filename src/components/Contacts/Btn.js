import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../../actions';
import './Btn.css';

class Btn extends Component {
	logout = () => {
		this.props.logout();
		this.props.history.push('/login');
	};

	render() {
		return (
			<section className="buttons">
				<div className="btn-group" role="group">
					<button type="button" className="btn btn-danger mr-2" onClick={this.logout}>
						Logout
					</button>
					<Link
						to="/"
						role="btn"
						className={`btn btn-info mr-2 ${this.props.location.pathname === '/' ? 'disabled' : ''}`}
					>
						Go Back To Home
					</Link>
					<Link
						to="/add"
						role="btn"
						className={`btn btn-primary mr-2 ${this.props.location.pathname !== '/' ? 'disabled' : ''}`}
					>
						Add A New Contact
					</Link>
				</div>
			</section>
		);
	}
}

export default connect(null, { logout })(withRouter(Btn));
