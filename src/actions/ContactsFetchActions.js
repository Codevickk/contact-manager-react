import { CONTACTS_FETCH_LOADING, CONTACTS_FETCH_ERROR, CONTACTS_FETCH_SUCCESS } from './types';
import axios from 'axios';
import { apiUrl } from '../utils';

export const fetchContacts = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		dispatch(contactsLoading(true));

		axios
			.post(apiUrl + 'contacts/read.php', {
				token
			})
			.then((res) => {
				if (res.status === 200) {
					dispatch(contactsLoadingSuccess(res.data));
					dispatch(contactsLoading(false));
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
				dispatch(contactsLoadingError(data));
				dispatch(contactsLoading(false));
			});
	};
};

export const contactsLoading = (state) => {
	return {
		type: CONTACTS_FETCH_LOADING,
		payload: state
	};
};

export const contactsLoadingError = (err) => {
	const { error } = err;
	return {
		type: CONTACTS_FETCH_ERROR,
		payload: error
	};
};

export const contactsLoadingSuccess = (data) => {
	const { count, contacts } = data;
	return {
		type: CONTACTS_FETCH_SUCCESS,
		payload: {
			count,
			contacts
		}
	};
};
