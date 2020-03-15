const GroceryList = artifacts.require('GroceryList');

contract('ShoppingList', function(accounts) {
	it('should add item', async () => {
		//consts
		const itemName = 'milk';
		const itemQuantity = 9;

		//instance
		const instance = await GroceryList.deployed();

		//add item
		await instance.addItem(itemName, itemQuantity);
		//get ids
		const ids = await instance.getAllIds.call();
		assert.equal(ids.length, 1, 'Item was not added');
		const id = ids[0].toString();

		//get item
		const item = await instance.getItem(id);
		assert.equal(item[0], itemName, 'Item name is incorrect');
		assert.equal(
			Number(item[1]),
			itemQuantity,
			'Item quantity is incorrect'
		);
	});
});
