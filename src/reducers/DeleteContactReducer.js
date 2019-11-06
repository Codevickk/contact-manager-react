import { DELETE_CONTACT_ERROR, DELETE_CONTACT_SUCCESS, RESET_DELETE_STATE } from '../actions/types';

const INITIAL_STATE = {
	error: '',
	success: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case DELETE_CONTACT_ERROR:
			return {
				...state,
				error: action.payload
			};

		case DELETE_CONTACT_SUCCESS:
			return {
				...state,
				success: action.payload
			};

		case RESET_DELETE_STATE:
			return INITIAL_STATE;

		default:
			return state;
	}
};
