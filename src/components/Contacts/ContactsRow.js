import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteContact, fetchContacts, resetDeleteState } from '../../actions';

class ContactsRow extends Component {
	constructor(props) {
		super(props);
		this.confirmContactDelete = this.confirmContactDelete.bind(this);
	}

	renderResponse() {
		let response = '';
		if (this.props.error) {
			response = this.props.error;
		} else {
			if (this.props.success) {
				response = this.props.success;
			}
		}
		// Check if there's a response
		if (response) {
			alert(response);
			// Reset the delete state in order to prevent this alert from appearing multiple times
			this.props.resetDeleteState();
			// Refresh the contacts
			this.props.fetchContacts();
		}
	}

	confirmContactDelete() {
		const id = this.props.contact.contact_id;
		let del = window.confirm('Are you sure you want to delete this contact?');
		if (del) {
			this.props.deleteContact({ id });
		}
	}

	render() {
		this.renderResponse();
		const { contact_id, name, email, phone_number } = this.props.contact;
		return (
			<tr>
				<th scope="row">{this.props.no}</th>
				<td>{name}</td>
				<td>{email}</td>
				<td>{phone_number}</td>
				<td>
					<Link to={`edit/${contact_id}`} role="btn" className="btn btn-secondary mr-2">
						Edit
					</Link>
					<button className="btn btn-danger" onClick={this.confirmContactDelete}>
						Delete
					</button>
				</td>
			</tr>
		);
	}
}

const mapStateToProps = (state) => {
	const { error, success } = state.deleteContact;
	return {
		error,
		success
	};
};

export default connect(mapStateToProps, { deleteContact, fetchContacts, resetDeleteState })(withRouter(ContactsRow));
