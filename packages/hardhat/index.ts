import counterContract from './artifacts/contracts/Counter.sol/Counter.json';

const { abi: counterContractAbi } = counterContract;

export type { Counter } from './typechain-types';
export { counterContractAbi };
