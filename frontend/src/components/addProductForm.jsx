import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class AddProductForm extends Form {
	state = {
		data: { name: '', quantity: '' },
		errors: {}
	};

	schema = {
		name: Joi.string()
			.alphanum()
			.min(1)
			.max(40)
			.required()
			.label('Product'),
		quantity: Joi.number()
			.min(1)
			.required()
			.label('Quantity')
	};

	doSubmit = () => {
		// Call the server
		this.props.onAdd(this.state.data);

		// Clear data
		this.setState({
			data: {
				name: '',
				quantity: ''
			}
		});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('name', 'Product')}
					{this.renderInput('quantity', 'Quantity')}
					{this.renderSubmitButton('Add')}
				</form>
			</div>
		);
	}
}

export default AddProductForm;
