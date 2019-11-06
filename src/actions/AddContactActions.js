import {
	UPDATE_ADD_CONTACT_FORM,
	ADD_CONTACT_FORM_LOADING,
	SHOW_ADD_CONTACT_ERRORS,
	CLEAR_ADD_CONTACT_ERRORS,
	ADD_CONTACT_SUCCESS,
	RESET_ADD_CONTACT_FORM
} from './types';

import { apiUrl } from '../utils';
import axios from 'axios';

/* ADD CONTACT  ACTIONS */

export const resetAddContactForm = () => {
	return {
		type: RESET_ADD_CONTACT_FORM
	};
};

export const updateAddContactForm = ({ name, value }) => {
	return {
		type: UPDATE_ADD_CONTACT_FORM,
		payload: {
			name,
			value
		}
	};
};

export const addContact = ({ name, email, phoneNumber }) => {
	return (dispatch) => {
		const token = localStorage.getItem('token');

		dispatch(clearAddContactErrors());
		dispatch(addContactFormLoading(true));

		axios
			.post(apiUrl + 'contacts/add.php', {
				token,
				name,
				email,
				phone_number: phoneNumber
			})
			.then((res) => {
				if (res.status === 201) {
					// registration is successful
					const { message } = res.data;
					dispatch(clearAddContactErrors());
					dispatch(addContactFormLoading(false));
					dispatch(addContactSuccess(message));
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
				dispatch(showAddContactErrors(data));
				dispatch(addContactFormLoading(false));
			});
	};
};

export const addContactFormLoading = (state) => {
	return {
		type: ADD_CONTACT_FORM_LOADING,
		payload: state
	};
};

export const showAddContactErrors = (err) => {
	const { name, email, phone_number, error } = err;
	return {
		type: SHOW_ADD_CONTACT_ERRORS,
		payload: {
			nameErrors: name,
			emailErrors: email,
			phoneNumberErrors: phone_number,
			otherErrors: error
		}
	};
};

export const clearAddContactErrors = () => {
	return {
		type: CLEAR_ADD_CONTACT_ERRORS
	};
};

export const addContactSuccess = (success) => {
	return {
		type: ADD_CONTACT_SUCCESS,
		payload: success
	};
};

/* ADD CONTACT ACTIONS ENDED */
