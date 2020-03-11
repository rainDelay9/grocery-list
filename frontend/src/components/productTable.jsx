import React, { Component } from 'react';

class ProductTable extends Component {
	render() {
		return (
			<table className='table table-borderless mt-2'>
				<thead>
					<tr>
						{this.props.headers.map((head, index) => (
							<th key={index}>{head}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{this.props.products.map((product, index) => (
						<tr key={product.id}>
							<th>{index + 1}</th>
							<td>{product.name}</td>
							<td>{product.quantity}</td>
							<td>
								<button
									className='btn btn-info btn-sm mr-2'
									onClick={() => {
										this.props.onQuantityChanged(
											product.id,
											product.quantity + 1
										);
									}}>
									+
								</button>
								<button
									className='btn btn-info btn-sm mr-2'
									onClick={() => {
										this.props.onQuantityChanged(
											product.id,
											product.quantity - 1
										);
									}}
									disabled={product.quantity === 0}>
									-
								</button>
								<button
									className='btn btn-danger btn-sm'
									onClick={() => {
										this.props.onRemove(product.id);
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
