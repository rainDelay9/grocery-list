# ETH-based React.js Grocery List
This is a test ETH+React.js-based grocery list app.

---

## Backend
The backend uses ETH smart contract. There's actually no need for that, but I wanted to do something with solidity on my own and not through tutorials, so what the heck. It was built using [Truffle](https://www.trufflesuite.com/), and tested (besides unit testing) using [Metamask](https://metamask.io/) which sometimes works, and sometimes does not.

### Deploying Locally w/ Truffle Dev
to deploy with truffle (after installing) use
```bash
> truffle dev
```
from backend folder, and
```bash
> deploy
```
to deploy the contract.
This will give you two outcomes. The first is a mnemonic you can use in metamask when importing a new wallet (after truffle dev) to interact with the contract, and the second is the contract's deployed address, e.g
```bash
> contract address:    0x57E6BaC4a7fa676dF6D825A9a650eA242096Da6C
```
which you should use in the first screen of the frontend.

If you are confident enough to deploy outside of truffle dev (perhaps to one of the test networks?) then you probably also know how to interact with the deployed contract.

---

## Frontend
The frontend was created using [create-react-app](https://create-react-app.dev/docs/getting-started/). Again, no real use for React.js, I just wanted to learn outside of a structured tutorial. 
### Startup
To start the app execute
```bash
> npm install
> npm start
```
or
```bash
> yarn install
> yarn start
```
The app will open at
```
localhost:3000
```

### Using the App

On the first screen you will be prompted to enter your smart contract's address. I will assume you are using Metamask so you will then be prompted (you might not be because Metamask...) to connect metamask to the smart contract. You can now add products, change quantitys, and remove products. For every action you make you will be prompted to approve the transaction in Metamask. Approve and observe. Note that depending on the network you choose transactions might take some time to be approved. Thus, for example if you add a product it might take a few seconds until it appears on the list. This happens because the transaction needs to be mined and an event must be emitted for the list to be updated. This ensures that the view is completely in sync with data on the blockchain.

---
#### Details & Contact
This README and app were written by Matan Orland for practice sake. It probably contains bugs/unintended features. You may use anything you want free of charge. Enjoy. For questions email matan dot orland at gmail dot com.
