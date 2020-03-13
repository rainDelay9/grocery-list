import Web3 from 'web3';

export const initWeb3 = () => {
	return new Promise((resolve, reject) => {
		if (typeof window.ethereum !== 'undefined') {
			window.ethereum
				.enable()
				.then(() => {
					resolve(new Web3(window.ethereum));
				})
				.catch(e => {
					reject(e);
				});
			return;
		}
		if (typeof window.web3 !== 'undefined') {
			return resolve(new Web3(window.web3.currentProvider));
		}
		resolve(new Web3('http://localhost:9545'));
	});
};

export const initContract = (web3, artifact, address) => {
	const deploymentKey = Object.keys(artifact.networks)[0];
	const contract = new web3.eth.Contract(
		artifact.abi,
		artifact.networks[deploymentKey].address
	);
	contract.options.address = address;
	return contract;
};
