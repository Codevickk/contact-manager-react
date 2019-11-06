import {
	UPDATE_REGISTER_FORM,
	REGISTER_FORM_LOADING,
	CLEAR_REGISTER_ERRORS,
	SHOW_REGISTER_ERRORS,
	REGISTER_SUCCESS,
	RESET_REGISTER_FORM
} from './types';

import { apiUrl } from '../utils';
import axios from 'axios';

/* REGISTER  ACTIONS */

export const resetRegisterForm = () => {
	return {
		type: RESET_REGISTER_FORM
	};
};

export const updateRegisterForm = ({ name, value }) => {
	return {
		type: UPDATE_REGISTER_FORM,
		payload: {
			name,
			value
		}
	};
};

export const register = ({ username, password }) => {
	return (dispatch) => {
		dispatch(clearRegisterErrors());
		dispatch(registerFormLoading(true));

		axios
			.post(apiUrl + 'user/register.php', {
				username,
				password
			})
			.then((res) => {
				if (res.status === 201) {
					// registration is successful
					const { message } = res.data;
					dispatch(clearRegisterErrors());
					dispatch(registerFormLoading(false));
					dispatch(registerSuccess(message));
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
				dispatch(showRegisterErrors(data));
				dispatch(registerFormLoading(false));
			});
	};
};

export const registerFormLoading = (state) => {
	return {
		type: REGISTER_FORM_LOADING,
		payload: state
	};
};

export const showRegisterErrors = (err) => {
	const { username, password, error } = err;
	return {
		type: SHOW_REGISTER_ERRORS,
		payload: {
			usernameErrors: username,
			passwordErrors: password,
			otherErrors: error
		}
	};
};

export const clearRegisterErrors = () => {
	return {
		type: CLEAR_REGISTER_ERRORS
	};
};

export const registerSuccess = (success) => {
	return {
		type: REGISTER_SUCCESS,
		payload: success
	};
};

/* REGISTER ACTIONS ENDED */
