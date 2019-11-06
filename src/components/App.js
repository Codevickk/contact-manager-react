import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './../reducers';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Home from './Contacts/Home';
import AddNewContact from './Contacts/AddNewContact';
import EditContact from './Contacts/EditContact';
import './App.css';
import PrivateRoute from './PrivateRoute';

class App extends Component {
	render() {
		const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
		const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(ReduxThunk)));

		return (
			<Provider store={store}>
				<React.Fragment>
					<div className="main-container">
						<Router>
							<Switch>
								<Route path="/register" component={Register} />
								<Route path="/login" component={Login} />

								<PrivateRoute exact path="/" component={Home} />
								<PrivateRoute exact path="/add" component={AddNewContact} />
								<PrivateRoute exact path="/edit/:id" component={EditContact} />
							</Switch>
						</Router>
					</div>
				</React.Fragment>
			</Provider>
		);
	}
}

export default App;
