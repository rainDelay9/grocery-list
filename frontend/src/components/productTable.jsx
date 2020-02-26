import React, { Component } from 'react';

class ProductTable extends Component {
	state = {
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

	render() {
		return (
			<table className='table table-borderless mt-2'>
				<thead>
					<tr>
						{this.state.tableHeaders.map((head, index) => (
							<th key={index}>{head}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{this.state.products.map((product, index) => (
						<tr key={product.id}>
							<th>{index + 1}</th>
							<td>{product.name}</td>
							<td>{product.quantity}</td>
							<td>
								<button
									className='btn btn-info btn-sm mr-2'
									onClick={() => {
										this.handleIncrement(product);
									}}>
									+
								</button>
								<button
									className='btn btn-info btn-sm mr-2'
									onClick={() => {
										this.handleDecrement(product);
									}}
									disabled={product.quantity === 0}>
									-
								</button>
								<button
									className='btn btn-danger btn-sm'
									onClick={() => {
										this.handleErase(product);
									}}>
									X
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default ProductTable;
