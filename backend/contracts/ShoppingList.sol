pragma solidity >=0.5.0 <=0.6.0;

contract GroceryList {
    struct Item {
        bool exists;
        string name;
        uint256 quantity;
    }

    event ItemAdded(uint256 _id, string _name, uint256 _quantity);
    event ItemRemoved(uint256 _id);
    event ItemQuantityChanged(uint256 _id, uint256 _quantity);

    uint256[] public ids;
    mapping(uint256 => uint256) public idToIndex;
    mapping(uint256 => Item) public groceries;

    modifier itemExists(uint256 _id) {
        require(groceries[_id].exists, "Item does not exist");
        _;
    }

    function _generateNewId(string memory _str)
        internal
        pure
        returns (uint256)
    {
        return uint256(keccak256(abi.encodePacked(_str)));
    }

    function addItem(string memory _name, uint256 _quantity)
        public
        returns (uint256)
    {
        uint256 id = _generateNewId(_name);
        require(!groceries[id].exists, "Item already exists!");
        groceries[id] = Item(true, _name, _quantity);
        ids.push(id);
        idToIndex[id] = ids.length;
        emit ItemAdded(id, _name, _quantity);
    }

    function getItem(uint256 _id)
        public
        view
        itemExists(_id)
        returns (string memory, uint256)
    {
        return (groceries[_id].name, groceries[_id].quantity);
    }

    function getAllIds() public view returns (uint256[] memory) {
        return ids;
    }

    function removeItem(uint256 _id) public itemExists(_id) {
        groceries[_id].exists = false;
        uint256 index = idToIndex[_id];
        if (ids.length > 1) {
            ids[index] = ids[ids.length - 1];
            idToIndex[ids[index]] = index;
        }
        ids.length--;
        emit ItemRemoved(_id);
    }

    function incrementItem(uint256 _id) public itemExists(_id) {
        groceries[_id].quantity++;
        emit ItemQuantityChanged(_id, groceries[_id].quantity);
    }

    function DecrementItem(uint256 _id) public itemExists(_id) {
        groceries[_id].quantity--;
        emit ItemQuantityChanged(_id, groceries[_id].quantity);
    }
}
