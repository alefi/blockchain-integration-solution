import ganache from 'ganache';
import Web3 from 'web3';

import { config } from '../../config';

const options = {
  chain: { chainId: 31337 }, // Similar to hardhat's one.
  logging: { quiet: true },
  wallet: {
    accounts: [
      {
        balance: Web3.utils.toHex(Web3.utils.toWei(100, 'ether')),
        secretKey: config.WALLET_PRIVATE_KEY,
      },
    ],
  },
};

export const ganacheProviderFactory = () => ganache.provider(options);
