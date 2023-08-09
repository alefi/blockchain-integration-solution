import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-abi-exporter';
import { HardhatUserConfig } from 'hardhat/config';
import { type NetworksUserConfig } from 'hardhat/types';
import { config } from './config';

const { PROVIDER_APP_ID, PROVIDER_HTTP_URL, WALLET_PRIVATE_KEY } = config;

const networks: NetworksUserConfig = {
  hardhat: {
    allowUnlimitedContractSize: true,
  },
};

if (PROVIDER_HTTP_URL && WALLET_PRIVATE_KEY) {
  networks.sepolia = {
    chainId: 0xaa36a7,
    url: `${PROVIDER_HTTP_URL}/${PROVIDER_APP_ID}`,
    accounts: [WALLET_PRIVATE_KEY],
  };
}

const hardhatUserConfig: HardhatUserConfig = {
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  abiExporter: {
    clear: true,
    runOnCompile: true,
  },
  networks,
};

export default hardhatUserConfig;
