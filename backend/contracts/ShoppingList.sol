pragma solidity >=0.5.0 <=0.6.0;

contract GroceryList {
    struct Item {
        bool exists;
        string name;
        uint256 quantity;
    }

    mapping(uint256 => Item) public groceries;

    modifier itemExists(uint256 _id) {
        require(groceries[_id].exists);
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
        groceries[id] = Item(true, _name, _quantity);
        return id;
    }

    function getItem(uint256 _id)
        public
        view
        itemExists(_id)
        returns (string memory, uint256)
    {
        return (groceries[_id].name, groceries[_id].quantity);
    }

    function removeItem(uint256 _id) public itemExists(_id) {
        groceries[_id].exists = false;
    }

    function incrementItem(uint256 _id) public itemExists(_id) {
        groceries[_id].quantity++;
    }

    function DecrementItem(uint256 _id) public itemExists(_id) {
        groceries[_id].quantity--;
    }
}
