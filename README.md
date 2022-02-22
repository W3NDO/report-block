# BlockReport
## On Chain Credit Tracking

### Introduction
Block Report is a web3 application that allows users to keep track of the credit accounts of their lendees and even their own credit. Whenever a borrower takes out a credit loan, it is recorded on chain. Any payments made or missed will also be recorded, with a timestamp. Account Closure will also be recorded on chain. Furthermore, disputes are also recorded on chain.

All this works to build a transparent credit reporting system to prevent any scamming or payment avoidance. 

### Frontend


### Smart Contract
The smart contract is written in AssemblyScript, one of the languages supported by the NEAR platform. 



[react]: https://reactjs.org/
[create-near-app]: https://github.com/near/create-near-app
[node.js]: https://nodejs.org/en/download/package-manager/
[jest]: https://jestjs.io/
[near accounts]: https://docs.near.org/docs/concepts/account
[near wallet]: https://wallet.testnet.near.org/
[near-cli]: https://github.com/near/near-cli
[gh-pages]: https://github.com/tschaub/gh-pages


### TESTING
#### Contract
- To test the contract as it is right now run the following commands on the terminal. You need near-cli installed. 
1. npm run build:contract
2. near dev-deploy out/main.wasm
3. near call <<dev-account-string>> contractMethod <<method params as {key: value}>>

**later on we shall write a full test suite for the contract**

