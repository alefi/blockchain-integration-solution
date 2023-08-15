import type { Web3BaseWalletAccount } from 'web3';

import counterContract from 'bc-hardhat/artifacts/contracts/Counter.sol/Counter.json';
import { web3 } from '../../web3';

export const deployCounterContract = async (signer: Web3BaseWalletAccount) => {
  console.log(`Attempting to deploy from account ${signer.address}`);
  const { abi, bytecode } = counterContract;

  const counter = new web3.eth.Contract(abi);
  const tx = counter.deploy({ data: bytecode });

  const [gasLimit, gasPrice, nonce] = await Promise.all([
    tx.estimateGas(),
    web3.eth.getGasPrice(),
    web3.eth.getTransactionCount(signer.address),
  ]);

  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      data: tx.encodeABI(),
      gasLimit: web3.utils.toHex(gasLimit),
      gasPrice: web3.utils.toHex(gasPrice),
      nonce,
    },
    signer.privateKey,
  );

  const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
  console.log(`Contract deployed at address: ${createReceipt.contractAddress}`);
};
