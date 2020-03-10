import React, { Component } from 'react';
import ShoppingList from './components/shoppingList';
import Web3 from 'web3';
import './App.css';

import * as artifact from './contracts/GroceryList';

class App extends Component {
	state = {
		items: []
	};

	async componentDidMount() {
		const web3 = new Web3(
			Web3.givenProvider ||
				new Web3.providers.HttpProvider('https://127.0.0.1:9545')
		);

		this.contract = new web3.eth.Contract(
			artifact.abi,
			artifact.networks[0]
		);

		this.contract.options.address =
			'0x57E6BaC4a7fa676dF6D825A9a650eA242096Da6C';

		const accounts = await web3.eth.getAccounts();
		this.account = accounts[0];

		await window.ethereum.enable();

		let ids = await this.contract.methods.getAllIds().call({
			from: this.account
		});

		const items = [];

		for (let id of ids) {
			const response = await this.contract.methods.getItem(id).call({
				from: this.account
			});
			items.push({
				id: id,
				name: response[0],
				quantity: Number(response[1])
			});
		}
		this.setState({ items });

		this.contract.events.ItemAdded([], (error, event) => {
			console.log('Item added!');
			const items = [...this.state.items];
			items.push({
				id: event.returnValues[0],
				name: event.returnValues[1],
				quantity: Number(event.returnValues[2])
			});
			this.setState({ items });
		});

		this.contract.events.ItemRemoved([], (error, event) => {
			console.log('Item removed!');
			const id = event.returnValues[0];
			const items = [...this.state.items].filter(item => item.id !== id);
			this.setState({ items });
		});

		this.contract.events.ItemQuantityChanged([], (error, event) => {
			console.log('Item quantity changed!');
			const id = event.returnValues[0];
			const quantity = Number(event.returnValues[1]);
			const items = [...this.state.items].map(item => {
				if (item.id === id) item.quantity = quantity;
				return item;
			});
			this.setState({ items });
		});
	}

	handleDeleteFunctor = id => {
		return () => {
			this.contract.methods.removeItem(id).send({
				from: this.account
			});
		};
	};

	handleAdd = (name, quantity) => {
		this.contract.methods.addItem(name, quantity).send({
			from: this.account
		});
	};

	render() {
		return (
			<div className='App'>
				<ShoppingList
					products={this.state.items}
					onDeleteFunctor={this.handleDeleteFunctor}
					onAdd={this.handleAdd}
				/>
			</div>
		);
	}
}

export default App;
