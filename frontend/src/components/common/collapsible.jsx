import React from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

const Collapsible = ({ buttonText, body, isOpen, onToggle }) => {
	return (
		<div>
			<Button
				color='primary'
				onClick={onToggle}
				style={{ marginBottom: '1rem' }}>
				{buttonText}
			</Button>
			<Collapse isOpen={isOpen}>
				<Card>
					<CardBody>{body}</CardBody>
				</Card>
			</Collapse>
		</div>
	);
};

export default Collapsible;
