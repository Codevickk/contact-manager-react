import {
	UPDATE_LOGIN_FORM,
	LOGIN_FORM_LOADING,
	CLEAR_LOGIN_ERRORS,
	SHOW_LOGIN_ERRORS,
	RESET_LOGIN_FORM
} from './types';

import { apiUrl } from '../utils';
import axios from 'axios';

/* LOGIN  ACTIONS */

export const updateLoginForm = ({ name, value }) => {
	return {
		type: UPDATE_LOGIN_FORM,
		payload: {
			name,
			value
		}
	};
};

export const login = ({ username, password }) => {
	return (dispatch) => {
		dispatch(clearLoginErrors());
		dispatch(loginFormLoading(true));

		axios
			.post(apiUrl + 'user/login.php', {
				username,
				password
			})
			.then((res) => {
				if (res.status === 200) {
					// the login is successful
					const { token } = res.data;
					localStorage.setItem('token', token);
					localStorage.setItem('username', username);
					dispatch(clearLoginErrors());
					dispatch(resetLoginForm());
					dispatch(loginFormLoading(false));
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

				dispatch(showLoginErrors(data));
				dispatch(loginFormLoading(false));
			});
	};
};

export const loginFormLoading = (state) => {
	return {
		type: LOGIN_FORM_LOADING,
		payload: state
	};
};

export const showLoginErrors = (err) => {
	const { username, password, error } = err;
	return {
		type: SHOW_LOGIN_ERRORS,
		payload: {
			usernameErrors: username,
			passwordErrors: password,
			otherErrors: error
		}
	};
};

export const clearLoginErrors = () => {
	return {
		type: CLEAR_LOGIN_ERRORS
	};
};

export const resetLoginForm = () => {
	return {
		type: RESET_LOGIN_FORM
	};
};

export const logout = () => {
	return () => {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
	};
};

/* LOGIN ACTIONS ENDED */
