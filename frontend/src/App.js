import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ShoppingListPage from './components/shoppingListPage';
import ContractAddressForm from './components/contractAddressForm';
import Error from './components/common/error';

import './App.css';

class App extends Component {
	render() {
		return (
			<div className='App'>
				<Switch>
					<Route
						path='/address'
						exact
						component={ContractAddressForm}
					/>
					<Route
						path='/shopping-list/:address'
						component={ShoppingListPage}
					/>
					<Route path='/error/:message' component={Error} />
					<Redirect exact from='/' to='/address' />
					<Redirect to='/error/page-not-found' />
				</Switch>
			</div>
		);
	}
}

export default App;
