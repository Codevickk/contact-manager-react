import {
	LOAD_CONTACT_DETAILS,
	UPDATE_EDIT_CONTACT_FORM,
	EDIT_CONTACT_FORM_LOADING,
	SHOW_EDIT_CONTACT_ERRORS,
	CLEAR_EDIT_CONTACT_ERRORS,
	EDIT_CONTACT_SUCCESS,
	RESET_EDIT_CONTACT_FORM
} from '../actions/types';

const INITIAL_STATE = {
	name: '',
	email: '',
	phoneNumber: '',
	loading: false,
	nameErrors: '',
	emailErrors: '',
	phoneNumberErrors: '',
	otherErrors: '',
	success: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case RESET_EDIT_CONTACT_FORM:
			return INITIAL_STATE;

		case LOAD_CONTACT_DETAILS:
			return {
				...state,
				name: action.payload.name,
				email: action.payload.email,
				phoneNumber: action.payload.phoneNumber
			};

		case UPDATE_EDIT_CONTACT_FORM:
			return { ...state, [action.payload.name]: action.payload.value };

		case EDIT_CONTACT_FORM_LOADING:
			return { ...state, loading: action.payload };

		case SHOW_EDIT_CONTACT_ERRORS:
			return {
				...state,
				nameErrors: action.payload.nameErrors,
				emailErrors: action.payload.emailErrors,
				phoneNumberErrors: action.payload.phoneNumberErrors,
				otherErrors: action.payload.otherErrors,
				success: ''
			};

		case CLEAR_EDIT_CONTACT_ERRORS:
			return {
				...state,
				nameErrors: '',
				emailErrors: '',
				phoneNumberErrors: '',
				otherErrors: ''
			};

		case EDIT_CONTACT_SUCCESS:
			return {
				...state,
				success: action.payload
			};

		default:
			return state;
	}
};
