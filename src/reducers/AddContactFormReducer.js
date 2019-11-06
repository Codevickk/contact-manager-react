import {
	UPDATE_ADD_CONTACT_FORM,
	ADD_CONTACT_FORM_LOADING,
	SHOW_ADD_CONTACT_ERRORS,
	CLEAR_ADD_CONTACT_ERRORS,
	ADD_CONTACT_SUCCESS,
	RESET_ADD_CONTACT_FORM
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
		case RESET_ADD_CONTACT_FORM:
			return INITIAL_STATE;

		case UPDATE_ADD_CONTACT_FORM:
			return { ...state, [action.payload.name]: action.payload.value };

		case ADD_CONTACT_FORM_LOADING:
			return { ...state, loading: action.payload };

		case SHOW_ADD_CONTACT_ERRORS:
			return {
				...state,
				nameErrors: action.payload.nameErrors,
				emailErrors: action.payload.emailErrors,
				phoneNumberErrors: action.payload.phoneNumberErrors,
				otherErrors: action.payload.otherErrors,
				success: ''
			};

		case CLEAR_ADD_CONTACT_ERRORS:
			return {
				...state,
				nameErrors: '',
				emailErrors: '',
				phoneNumberErrors: '',
				otherErrors: ''
			};

		case ADD_CONTACT_SUCCESS:
			return {
				...state,
				success: action.payload
			};

		default:
			return state;
	}
};
