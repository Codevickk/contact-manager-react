import { CONTACTS_FETCH_LOADING, CONTACTS_FETCH_ERROR, CONTACTS_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
	loading: false,
	count: '',
	contacts: '',
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CONTACTS_FETCH_LOADING:
			return { ...state, loading: action.payload };

		case CONTACTS_FETCH_ERROR:
			return {
				...state,
				error: action.payload
			};

		case CONTACTS_FETCH_SUCCESS:
			return {
				...state,
				count: action.payload.count,
				contacts: action.payload.contacts
			};

		default:
			return state;
	}
};
