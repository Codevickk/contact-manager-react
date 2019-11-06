import { DELETE_CONTACT_ERROR, DELETE_CONTACT_SUCCESS, RESET_DELETE_STATE } from './types';
import axios from 'axios';
import { apiUrl } from '../utils';

export const resetDeleteState = () => {
	return {
		type: RESET_DELETE_STATE
	};
};

export const deleteContact = ({ id }) => {
	return (dispatch) => {
		const token = localStorage.getItem('token');

		axios
			.post(apiUrl + 'contacts/delete.php', {
				token,
				contact_id: id
			})
			.then((res) => {
				if (res.status === 200) {
					const { message } = res.data;
					dispatch(deleteContactSuccess(message));
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
				dispatch(deleteContactError(data));
			});
	};
};

export const deleteContactError = (err) => {
	return {
		type: DELETE_CONTACT_ERROR,
		payload: err.error
	};
};

export const deleteContactSuccess = (success) => {
	return {
		type: DELETE_CONTACT_SUCCESS,
		payload: success
	};
};
