import Form from './common/form';

class ContractAddressForm extends Form {
	state = {
		data: { address: '' },
		errors: {}
	};

	schema = {
		address: Joi.string()
			.alphanum()
			.regex('^0x[A-Fa-f0-9]{40}/')
			.required()
			.label('Contract Address')
	};

	doSubmit = () => {
		// Call the server
		this.props.onSubmit(this.state.data.address);

		// Clear data
		this.setState({
			data: {
				address: ''
			}
		});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('address', 'Contract Address')}
					{this.renderSubmitButton('Submit')}
				</form>
			</div>
		);
	}
}

export default ContractAddressForm;
