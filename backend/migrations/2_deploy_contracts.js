const GroceryList = artifacts.require('GroceryList');

module.exports = function(deployer) {
	deployer.deploy(GroceryList);
};
