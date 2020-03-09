import React, { Component } from 'react';
import ProductTable from './productTable';
import AddProductForm from './addProductForm';
import { genHexString } from '../utils/stringUtils';
import Collapsible from './common/collapsible';

class ShoppingList extends Component {
	state = {
		isOpen: false,
		tableHeaders: ['#', 'Product', 'Quantity', ''],
		products: this.props.products
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
		console.log(this.props.products);
		return (
			<div>
				<div className='col'>
					<ProductTable
						headers={this.state.tableHeaders}
						products={this.props.products}
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
