import type { Web3BaseWalletAccount } from 'web3';

import { OnEventFn } from '../typings';
import { counter } from '../web3/contracts';
import { CounterService } from './counter.service';

export const CounterServiceFactory = (signer: Web3BaseWalletAccount, onData?: OnEventFn, onError?: OnEventFn) =>
  new CounterService(counter, signer, onData, onError);
