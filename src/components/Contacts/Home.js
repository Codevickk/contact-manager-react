import React, { Component } from 'react';
import PageHeader from '../PageHeader';
import { connect } from 'react-redux';
import { fetchContacts } from '../../actions';
import ContactsRow from './ContactsRow';
import Btn from './Btn';

class Home extends Component {
	componentDidMount() {
		this.props.fetchContacts();
	}

	renderContent() {
		if (this.props.loading) {
			return this.renderUnavailableContent('loading...');
		} else {
			// Loading Finished
			if (this.props.error) {
				return this.renderUnavailableContent(<div className="alert alert-danger">{this.props.error}</div>);
			} else {
				// The contacts has been fetched
				if (this.props.count < 1) {
					// No contacts available
					return this.renderUnavailableContent('You have no contacts on your list');
				} else {
					// There are contacts display them
					return this.renderAvailableContent();
				}
			}
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
		this.count = 0;
		return (
			<table className="table table-responsive table-striped">
				<thead className="thead-dark">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Email</th>
						<th scope="col">Phone Number</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{this.props.contacts.map((contact) => {
						this.count = this.count + 1;
						return <ContactsRow key={contact.contact_id} contact={contact} no={this.count} />;
					})}
				</tbody>
			</table>
		);
	}

	render() {
		return (
			<div className="sub-container">
				<PageHeader headerText="Contacts" />
				<div className="content-container">{this.renderContent()}</div>
				<Btn />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { loading, count, contacts, error } = state.contactsFetch;
	return {
		loading,
		count,
		contacts,
		error
	};
};

export default connect(mapStateToProps, { fetchContacts })(Home);
