import { Contract } from 'web3';

import { counterContractAbi } from 'bc-hardhat';
import { config } from '../../config';
import { web3 } from '..';

export type CounterContract = Contract<typeof counterContractAbi>;
export const counter: CounterContract = new web3.eth.Contract(counterContractAbi, config.COUNTER_CONTRACT_ADDRESS);
