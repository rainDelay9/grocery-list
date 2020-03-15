const GroceryList = artifacts.require('GroceryList');

contract('ShoppingList', function(accounts) {
	let instance;
	const items = [
		{
			name: 'milk',
			quantity: 9
		},
		{
			name: 'bread',
			quantity: 5
		}
	];
	beforeEach('setup contract', async () => {
		//get instance
		instance = await GroceryList.deployed();

		//remove all items
		const ids = await instance.getAllIds.call();
		const removePromises = [];
		for (let id of ids) {
			removePromises.push(instance.removeItem(id.toString()));
		}
		Promise.all(removePromises);
	});

	it('should add item', async () => {
		//consts
		const item = items[0];

		//add item
		await instance.addItem(item.name, item.quantity);

		//get ids
		const ids = await instance.getAllIds.call();
		assert.equal(ids.length, 1, 'Item was not added');
		const id = ids[0].toString();

		//get item
		const itemFromContract = await instance.getItem(id);
		assert.equal(itemFromContract[0], item.name, 'Item name is incorrect');
		assert.equal(
			Number(itemFromContract[1]),
			item.quantity,
			'Item quantity is incorrect'
		);
	});

	it('should remove item', async () => {
		await instance.addItem(items[0].name, items[0].quantity);
		let ids = await instance.getAllIds.call();
		instance.removeItem(ids[0].toString());
		ids = await instance.getAllIds.call();
		assert.equal(ids.length, 0, 'items list should be empty');
	});

	it('should revert if adding two items with same name', async () => {
		await instance.addItem(items[0].name, items[0].quantity);
		try {
			await instance.addItem(items[0].name, items[0].quantity);
			assert.fail();
		} catch (err) {
			assert.ok(/revert/.test(err.message));
		}
		let ids = await instance.getAllIds.call();
		assert.equal(ids.length, 1, 'Item was not added');
	});

	it("should revert if removing item that doesn't exist", async () => {
		await instance.addItem(items[0].name, items[0].quantity);
		try {
			await instance.removeItem('0000000000000000000000000');
		} catch (err) {
			assert.ok(/revert/.test(err.message));
		}
		let ids = await instance.getAllIds.call();
		assert.equal(ids.length, 1, 'Item does not exist');
	});

	it('should change quantity', async () => {
		const item = items[0];
		await instance.addItem(item.name, item.quantity);
		const newQuantity = item.quantity + 10;
		let ids = await instance.getAllIds.call();
		const id = ids[0].toString();
		await instance.changeQuantity(id, newQuantity);
		const itemFromContract = await instance.getItem(id);
		assert.equal(
			itemFromContract[0],
			item.name,
			'Read item name is not correct'
		);
		assert.equal(
			itemFromContract[1].toNumber(),
			newQuantity,
			'Read item quantity is not correct'
		);
	});

	it("should revert if changing quantity for item that doesn't exist", async () => {
		await instance.addItem(items[0].name, items[0].quantity);
		try {
			await instance.changeQuantity('0000000000000000000000000', 5);
		} catch (err) {
			assert.ok(/revert/.test(err.message));
		}
	});
});
