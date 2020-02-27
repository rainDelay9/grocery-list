import React, { Component } from 'react';
import ProductTable from './productTable';
import AddProductForm from './addProductForm';
import { genHexString } from '../utils/stringUtils';
import Collapsible from './common/collapsible';

class ShoppingList extends Component {
	state = {
		isOpen: false,
		tableHeaders: ['#', 'Product', 'Quantity', ''],
		products: [
			{
				name: 'milk',
				quantity: 2,
				id: '772f2505af8b98a744b93d16077f09b3'
			},
			{
				name: 'oats',
				quantity: 4,
				id: '9b90a7bc1b5cd4828f984e9e66eb7b7b'
			},
			{
				name: 'tortilla',
				quantity: 2,
				id: 'af39b8995c8424c6427873f6e010b290'
			},
			{
				name: 'grapes',
				quantity: 1,
				id: 'ddaec73fae09c6148c381dd69d34c82b'
			},
			{
				name: 'tomatoes',
				quantity: 7,
				id: '10c6c4d0ec90e8b45178dca0528c19de'
			}
		]
	};

	handleIncrement = product => {
		const products = this.state.products.map(prod => {
			if (prod.id === product.id) {
				return { ...prod, quantity: prod.quantity + 1 };
			} else {
				return { ...prod };
			}
		});

		this.setState({ products });
	};

	handleDecrement = product => {
		const products = this.state.products.map(prod => {
			if (prod.id === product.id) {
				return { ...prod, quantity: prod.quantity - 1 };
			} else {
				return { ...prod };
			}
		});

		this.setState({ products });
	};

	handleErase = product => {
		const products = [...this.state.products];
		products.splice(
			products.findIndex(prod => prod.id === product.id),
			1
		);

		this.setState({ products });
	};

	handleAddProduct = product => {
		const products = [...this.state.products];
		products.push({
			name: product.name,
			quantity: Number(product.quantity),
			id: this.makeNewProductId()
		});

		this.setState({ products });
	};

	handleToggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	makeNewProductId = () => genHexString(32);

	render() {
		return (
			<div>
				<div className='col'>
					<ProductTable
						headers={this.state.tableHeaders}
						products={this.state.products}
						onIncrement={this.handleIncrement}
						onDecrement={this.handleDecrement}
						onErase={this.handleErase}
					/>
				</div>
				<div className='col'>
					<Collapsible
						buttonText='Add Product'
						body={<AddProductForm onAdd={this.handleAddProduct} />}
						isOpen={this.state.isOpen}
						onToggle={this.handleToggle}
					/>
				</div>
			</div>
		);
	}
}

export default ShoppingList;
