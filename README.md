# Sample Ethereum blockchain integration DAPP POC solution

## Requirements

Create a simple application that can interact with an existing Ethereum smart contract via web3.js.

### Implementation details

1. Setting up the environment for Node.js and Web3.js:
2. Connecting to the Ethereum network:
    - Create an index.js file and initialize web3 connecting to the Ethereum network via Infura (or whatever RPC URL you provide).
3. Interaction with smart contract:
    - Choose an existing smart contract or create your own simple Solidity contract.
4. Get the ABI and address of this contract and use them to initialize the contract via web3 in your application.
5. Write a function that calls one of the smart contract functions and prints the result to the console.
6. Write a function that listens for a specific contract event and prints information about each event to the console.

### Testing

Write a set of basic unit tests to verify that features in your application work correctly.

### Additional requirements

Use of TypeScript is recommended.

### Goal

As a result, we expect to receive the code of your application, including:

- index.js file with the application code.
- Files with tests.
- README.md file with instructions for installing, configuring and running the application.

#### Evaluation criteria

- Code operability.
- Adhering to clean code principles and JavaScript and Node.js best practices.
- Completeness and correctness of the tests.
- Correctness and completeness of documentation.

### Notes

Make sure you handle possible errors and exceptions.
Feel free to use any additional libraries or tools you deem necessary.
Be prepared to explain your decisions and approaches during the code review stage.

> 📝 _[Original task requirements](./doc/Requirements.pdf)._

## Overview

This project build on [Turborepo](https://turborepo.org/).

### What's inside?

This turborepo uses [NPM](https://www.npmjs.com/) as a package manager. It includes the following apps/packages:

### Apps and Packages

- `client`: a sample blockchain client service
- `eslint-config-custom`: `eslint` and `prettier` configurations
- [bc-hardhat](./packages/hardhat/README.md): an Ethereum development environment which helps to develop, test and deploy smart contract. After compilation abi and types can be imported in apps.
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

> 📝 _Each app/package is 100% [TypeScript](https://www.typescriptlang.org/)._

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Prerequisites

- NodeJs `v18` is requred due to the [following gabache temporary limitation](https://github.com/trufflesuite/ganache/issues/4408#issuecomment-1559841839) that uses in the client application tests. They don't support `v20` yet.

### Further improvements

This code is provided as a PoC and it could be improved. For instance:

- create common network config to be able choose one easily
- use waffle and web3 on the Hardhat component

- optimise transactions, cache commonly used data with some TTL, such as `estimatedGas`
- handle errors better

## Usage

Please read this section carefully.

### Environment variables

- `NODE_ENV`: (optional) Used by client only for testing
- `COUNTER_CONTRACT_ADDRESS`: Use to address the smart contract on a blockchain (default value suitable for local development and testing as well).

The following are used for deployment and interacting on the real blockchain:

- `PROVIDER_APP_ID`: (optional) In terms of Infura should contain PROJECT ID
- `PROVIDER_HTTP_URL`: (optional) Use for contract deployment
- `PROVIDER_WS_URL`: (optional) Use for interaction with a contract
- `WALLET_PRIVATE_KEY`: A private wallet key that is going to be used for the contract deployment on real blockchain and retrieve data from that contract as well.

> 📝 _Please take a look at provided [env example](./.env.example) file located at the project root level._

### Initialisation

To make sure everithing works fine, copy [.env.example](./.env.example) file into `.env.local` and adjust settings inside according section above.

To first-time initialize the repository, run the following commands:

```console
npm i
npm run build
```

It installs dependencies, creates artifacts, compiles smart contracts, and exports their ABI.

### Run tests

> 📝 _Make sure no local Hardhat node is running._

```console
npm run test
```

### Run locally

> 📝 _Make sure nodejs and npm are installed._

First, run the Hadhat node:

```console
npm -w bc-hardhat run node
```

and after is started, deploy a smart contracts within a different terminal:

```console
$ npm -w bc-hardhat run deploy
Deploying Counter contract with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Counter contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

Finally, run the application:

```console
npm run dev
```

or, to precisely run only the client application, run the following command:

```console
npm -w client run dev
```

### Run on Sepolia testnet via Infura API

First, create an account on [Infura](https://www.infura.io) if you don't have one. It also needed to create an API Key. After passing that steps you will find demanded values to setup the application environment there on Infura's dashboard.

Second, set corresponding values into the `.env.local` file. Make sure you use Web socket provider for `PROVIDER_WS_URL`, otherwise subscriptions won't work. It is important to set each of variables correctly, especially `WALLET_PRIVATE_KEY`.

Third, get some [sepolia coins](https://www.infura.io/faucet/sepolia) to your wallet account.

Then type the following commands on your terminal window:

```console
npm -w bc-hardhat run deploy:sepolia
```

It should deploy the smart contract and print out its address. Set just received address as the contract address in `.env.local` file (located at the project root level), and run the following command:

```console
npm -w client run dev:sepolia
```

After some delay that needed to EVM to send transaction to blockchain, the client application will finish with success.

### Add or update dependencies

To add or update a dependency, add -w parameter with a corresponding name-space. Do not use the NPM in the former manner (without the name-space specifying):

```console
npm -w <namespace> ...<rest_args>
```

### Troubleshooting

If you've get `AbiError: Parameter decoding error: Returned values aren't valid...` error it could have one of the following reasons:

- you've forgotten to deploy a smart contract
- you've connected to the wrong blockchain network
- you are using the wrong smart contract address.

In case of weird compilation errors, it could be helpful to clean and rebuild apps/packages:

```console
npm run clean
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/features/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```console
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link this repo to your Remote Cache by running the following command from the root of your turborepo:

```console
npx turbo link
```

#### Cache troubleshooting

When you use turbo with tools that inline environment variables at build time (e.g. Next.js or Create React App), it is important to tell turbo about it. Otherwise, you could ship a cached build with the wrong environment variables! [Details](https://turbo.build/repo/docs/core-concepts/caching#altering-caching-based-on-environment-variables)

The cache strategy depends on `APP_ENV` and it is configured in `turbo.json`

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
