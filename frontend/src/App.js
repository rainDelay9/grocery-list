import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ShoppingListPage from './components/shoppingListPage';
import ContractAddressForm from './components/contractAddressForm';
import NotFound from './components/common/notFound';

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
					<Route path='/not-found' component={NotFound} />
					<Redirect exact from='/' to='/address' />
					<Redirect to='/not-found' />
				</Switch>
			</div>
		);
	}
}

export default App;
