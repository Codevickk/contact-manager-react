import {
	UPDATE_LOGIN_FORM,
	SHOW_LOGIN_ERRORS,
	LOGIN_FORM_LOADING,
	CLEAR_LOGIN_ERRORS,
	RESET_LOGIN_FORM
} from '../actions/types';

const INITIAL_STATE = {
	username: '',
	password: '',
	loading: false,
	usernameErrors: '',
	passwordErrors: '',
	otherErrors: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case RESET_LOGIN_FORM:
			return INITIAL_STATE;

		case UPDATE_LOGIN_FORM:
			return { ...state, [action.payload.name]: action.payload.value };

		case LOGIN_FORM_LOADING:
			return { ...state, loading: action.payload };

		case SHOW_LOGIN_ERRORS:
			return {
				...state,
				usernameErrors: action.payload.usernameErrors,
				passwordErrors: action.payload.passwordErrors,
				otherErrors: action.payload.otherErrors
			};

		case CLEAR_LOGIN_ERRORS:
			return {
				...state,
				usernameErrors: '',
				passwordErrors: '',
				otherErrors: ''
			};

		default:
			return state;
	}
};
