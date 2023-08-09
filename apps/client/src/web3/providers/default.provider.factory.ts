import Web3 from 'web3';

import { config } from '../../config';

const { PROVIDER_APP_ID, PROVIDER_WS_URL } = config;
const DEFAULT_URL = `${PROVIDER_WS_URL}/${PROVIDER_APP_ID}`;

export const defaultProviderFactory = (url = DEFAULT_URL) => {
  const provider = new Web3.providers.WebsocketProvider(url);

  provider.on('connect', () => {
    console.log('Connected to blockchain network');
  });
  provider.once('disconnect', () => {
    console.log('Disconnected from blockchain network');
  });

  return provider;
};
