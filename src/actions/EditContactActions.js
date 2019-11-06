import {
	RESET_EDIT_CONTACT_FORM,
	LOAD_CONTACT_DETAILS,
	UPDATE_EDIT_CONTACT_FORM,
	EDIT_CONTACT_FORM_LOADING,
	SHOW_EDIT_CONTACT_ERRORS,
	CLEAR_EDIT_CONTACT_ERRORS,
	EDIT_CONTACT_SUCCESS
} from './types';

import { apiUrl } from '../utils';
import axios from 'axios';

/* EDIT CONTACT  ACTIONS */

export const resetEditContactForm = () => {
	return {
		type: RESET_EDIT_CONTACT_FORM
	};
};

export const fetchContactDetails = ({ id }) => {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		dispatch(editContactFormLoading(true));

		axios
			.post(apiUrl + 'contacts/read_one.php', {
				token,
				contact_id: id
			})
			.then((res) => {
				if (res.status === 200) {
					// registration is successful
					const contact = res.data;
					dispatch(clearEditContactErrors());
					dispatch(loadContactDetails(contact));
					dispatch(editContactFormLoading(false));
				}
			})
			.catch((err) => {
				let data = '';
				if (err.response) {
					data = err.response.data;
				} else {
					data = {
						error: 'Unable to fetch information from the server'
					};
				}
				dispatch(showEditContactErrors(data));
				dispatch(editContactFormLoading(false));
			});
	};
};

export const loadContactDetails = (contact) => {
	const { name, email, phone_number } = contact;
	return {
		type: LOAD_CONTACT_DETAILS,
		payload: {
			name,
			email,
			phoneNumber: phone_number
		}
	};
};

export const updateEditContactForm = ({ name, value }) => {
	return {
		type: UPDATE_EDIT_CONTACT_FORM,
		payload: {
			name,
			value
		}
	};
};

export const editContact = ({ contactID, name, email, phoneNumber }) => {
	return (dispatch) => {
		const token = localStorage.getItem('token');

		dispatch(clearEditContactErrors());
		dispatch(editContactFormLoading(true));

		axios
			.post(apiUrl + 'contacts/edit.php', {
				token,
				contact_id: contactID,
				name,
				email,
				phone_number: phoneNumber
			})
			.then((res) => {
				if (res.status === 200) {
					// successful
					const { message } = res.data;
					dispatch(clearEditContactErrors());
					dispatch(editContactFormLoading(false));
					dispatch(editContactSuccess(message));
				}
			})
			.catch((err) => {
				let data = '';
				if (err.response) {
					data = err.response.data;
				} else {
					data = {
						error: 'Unable to fetch information from the server'
					};
				}
				dispatch(showEditContactErrors(data));
				dispatch(editContactFormLoading(false));
			});
	};
};

export const editContactFormLoading = (state) => {
	return {
		type: EDIT_CONTACT_FORM_LOADING,
		payload: state
	};
};

export const showEditContactErrors = (err) => {
	const { name, email, phone_number, error } = err;
	return {
		type: SHOW_EDIT_CONTACT_ERRORS,
		payload: {
			nameErrors: name,
			emailErrors: email,
			phoneNumberErrors: phone_number,
			otherErrors: error
		}
	};
};

export const clearEditContactErrors = () => {
	return {
		type: CLEAR_EDIT_CONTACT_ERRORS
	};
};

export const editContactSuccess = (success) => {
	return {
		type: EDIT_CONTACT_SUCCESS,
		payload: success
	};
};

/* EDIT CONTACT ACTIONS ENDED */
