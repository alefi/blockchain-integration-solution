import Web3 from 'web3';

import { signer } from './signer';
import { provider } from './providers';

const web3 = new Web3(provider);
web3.eth.accounts.wallet.add(signer);

export { signer, web3 };
