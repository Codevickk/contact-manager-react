import { combineReducers } from 'redux';
import LoginFormReducer from './LoginFormReducer';

import RegisterFormReducer from './RegisterFormReducer';
import ContactsFetchReducer from './ContactsFetchReducer';
import AddContactFormReducer from './AddContactFormReducer';
import EditContactFormReducer from './EditContactFormReducer';
import DeleteContactReducer from './DeleteContactReducer';

export default combineReducers({
	loginForm: LoginFormReducer,
	registerForm: RegisterFormReducer,

	contactsFetch: ContactsFetchReducer,
	addContactForm: AddContactFormReducer,
	editContactForm: EditContactFormReducer,
	deleteContact: DeleteContactReducer
});
