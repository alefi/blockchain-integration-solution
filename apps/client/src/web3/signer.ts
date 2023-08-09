import { Web3BaseWalletAccount, eth } from 'web3';

import { config } from '../config';

export const signer: Web3BaseWalletAccount = eth.accounts.privateKeyToAccount(config.WALLET_PRIVATE_KEY);
