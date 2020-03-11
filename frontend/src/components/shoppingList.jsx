import React, { Component } from 'react';
import ProductTable from './productTable';
import AddProductForm from './addProductForm';
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

	handleToggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		return (
			<div>
				<div className='col'>
					<ProductTable
						headers={this.state.tableHeaders}
						products={this.props.products}
						onQuantityChanged={this.props.onQuantityChanged}
						onRemove={this.props.onRemove}
					/>
				</div>
				<div className='col'>
					<Collapsible
						buttonText='Add Product'
						body={<AddProductForm onAdd={this.props.onAdd} />}
						isOpen={this.state.isOpen}
						onToggle={this.handleToggle}
					/>
				</div>
			</div>
		);
	}
}

export default ShoppingList;
