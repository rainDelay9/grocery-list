import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Error extends Component {
	render() {
		return (
			<h1>
				{this.props.match.params.message
					.replace(/-/g, ' ')
					.toUpperCase()}
			</h1>
		);
	}
}

export default withRouter(Error);
