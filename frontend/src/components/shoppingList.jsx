import React, { Component } from 'react';
import ProductTable from './productTable';

class ShoppingList extends Component {
	state = {};
	render() {
		return (
			<div>
				<button className='btn btn-primary btn-sm'>Add Product</button>
				<ProductTable />
			</div>
		);
	}
}

export default ShoppingList;
