import {
	UPDATE_REGISTER_FORM,
	REGISTER_FORM_LOADING,
	CLEAR_REGISTER_ERRORS,
	SHOW_REGISTER_ERRORS,
	REGISTER_SUCCESS,
	RESET_REGISTER_FORM
} from '../actions/types';

const INITIAL_STATE = {
	username: '',
	password: '',
	loading: false,
	usernameErrors: '',
	passwordErrors: '',
	otherErrors: '',
	success: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case RESET_REGISTER_FORM:
			return INITIAL_STATE;

		case UPDATE_REGISTER_FORM:
			return { ...state, [action.payload.name]: action.payload.value };

		case REGISTER_FORM_LOADING:
			return { ...state, loading: action.payload };

		case SHOW_REGISTER_ERRORS:
			return {
				...state,
				usernameErrors: action.payload.usernameErrors,
				passwordErrors: action.payload.passwordErrors,
				otherErrors: action.payload.otherErrors,
				success: ''
			};

		case CLEAR_REGISTER_ERRORS:
			return {
				...state,
				usernameErrors: '',
				passwordErrors: '',
				otherErrors: ''
			};

		case REGISTER_SUCCESS:
			return {
				...state,
				success: action.payload
			};

		default:
			return state;
	}
};
