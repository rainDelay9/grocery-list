import React, { Component } from 'react';
import ShoppingList from './components/shoppingList';
import './App.css';

import * as artifact from './contracts/GroceryList';
import { initWeb3, initContract } from './eth/web3Utils';
import ContractAddressForm from './components/contractAddressForm';

class App extends Component {
	state = {
		items: [],
		address: '',
		web3Initialized: false
	};

	async componentDidUpdate() {
		await this.initEth();
	}

	initEth = async () => {
		if (!this.state.address) return;
		if (this.state.web3Initialized) return;
		await this.initEthContract();

		let ids = await this.getAllIds(this.contract, this.account);

		this.initItems(this.contract, this.account, ids);

		this.RegisterContractEventListeners();

		this.setState((state, props) => ({
			web3Initialized: true
		}));
	};

	initEthContract = async () => {
		const web3 = await initWeb3();
		this.contract = initContract(
			web3,
			artifact.default,
			'0x57E6BaC4a7fa676dF6D825A9a650eA242096Da6C'
		);

		const accounts = await web3.eth.getAccounts();
		this.account = accounts[0];
	};

	getAllIds = async (contract, account) => {
		return (
			(await contract.methods.getAllIds().call({
				from: account
			})) || []
		);
	};

	initItems = async (contract, account, ids) => {
		const items = [];

		for (let id of ids) {
			const response = await contract.methods.getItem(id).call({
				from: account
			});
			items.push({
				id: id,
				name: response[0],
				quantity: Number(response[1])
			});
		}
		this.setState({ items });
	};

	RegisterContractEventListeners = () => {
		//Item added event
		this.contract.events
			.ItemAdded([], (error, event) => {
				const id = event.returnValues[0];
				const name = event.returnValues[1];
				const quantity = Number(event.returnValues[2]);

				// Check if item already exists
				if (
					this.state.items.some(item => {
						return id === item.id;
					})
				) {
					return;
				}

				// Push new item
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

		// Item removed
		this.contract.events
			.ItemRemoved([], (error, event) => {
				const id = event.returnValues[0];
				//Filter item (this is resilient to multiple events firing)
				const items = [...this.state.items].filter(
					item => item.id !== id
				);
				this.setState({ items });
			})
			.on('error', error => {
				console.log(error);
			});

		// Item quantity changed
		this.contract.events
			.ItemQuantityChanged([], (error, event) => {
				const id = event.returnValues[0];
				const quantity = Number(event.returnValues[1]);
				// Set the correct quantity
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
	};

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

	handleContractAddressSubmit = address => {
		console.log(address);
		this.setState({ address });
		console.log(this.state);
	};

	renderContractAddress = () => {
		return <div></div>;
	};

	render() {
		return (
			<div className='App'>
				{this.state.address ? (
					<div>
						<p> Contract Address: </p>
						<p> {this.state.address} </p>
						<ShoppingList
							products={this.state.items}
							onRemove={this.handleRemove}
							onAdd={this.handleAdd}
							addingEnabled={this.state.address}
							onQuantityChanged={this.handleQuantityChanged}
						/>
					</div>
				) : (
					<div>
						<ContractAddressForm
							onSubmit={this.handleContractAddressSubmit}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default App;
