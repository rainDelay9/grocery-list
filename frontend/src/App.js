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

		let ids =
			(await this.contract.methods.getAllIds().call({
				from: this.account
			})) || [];

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

		this.contract.events
			.ItemAdded([], (error, event) => {
				const id = event.returnValues[0];
				const name = event.returnValues[1];
				const quantity = Number(event.returnValues[2]);
				if (
					this.state.items.some(item => {
						return id === item.id;
					})
				) {
					return;
				}
				const items = [...this.state.items];
				items.push({
					id: id,
					name: name,
					quantity: quantity
				});
				this.setState({ items });
			})
			.on('error', error => {
				console.log(error);
			});

		this.contract.events
			.ItemRemoved([], (error, event) => {
				const id = event.returnValues[0];
				const items = [...this.state.items].filter(
					item => item.id !== id
				);
				this.setState({ items });
			})
			.on('error', error => {
				console.log(error);
			});

		this.contract.events
			.ItemQuantityChanged([], (error, event) => {
				const id = event.returnValues[0];
				const quantity = Number(event.returnValues[1]);
				const items = [...this.state.items].map(item => {
					if (item.id === id && item.quantity !== quantity)
						item.quantity = quantity;
					return item;
				});
				this.setState({ items });
			})
			.on('error', error => {
				console.log(error);
			});
	}

	handleRemove = async id => {
		const removeItemTx = this.contract.methods.removeItem(id);
		const gas = await removeItemTx.estimateGas({
			from: this.account
		});

		removeItemTx.send({
			from: this.account,
			gas: gas
		});
	};

	handleAdd = async (name, quantity) => {
		const addItemTx = this.contract.methods.addItem(name, quantity);

		addItemTx
			.send({
				from: this.account
			})
			.catch(error => {
				console.log(error);
			});
	};

	handleQuantityChanged = (id, quantity) => {
		this.contract.methods.changeQuantity(id, quantity).send({
			from: this.account
		});
	};

	render() {
		return (
			<div className='App'>
				<ShoppingList
					products={this.state.items}
					onRemove={this.handleRemove}
					onAdd={this.handleAdd}
					onQuantityChanged={this.handleQuantityChanged}
				/>
			</div>
		);
	}
}

export default App;
