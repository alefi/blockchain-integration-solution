import type { Web3BaseWalletAccount } from 'web3';

import type { CounterContract } from '../web3/contracts';
import { web3 } from '../web3';
import { OnEventFn } from '../typings';

export class CounterService {
  constructor(
    private counterContract: CounterContract,
    private signer: Web3BaseWalletAccount,
    onData?: OnEventFn,
    onError?: OnEventFn,
  ) {
    this.subscribe(onData, onError);
  }

  async getCurrentCount(): Promise<bigint> {
    return await this.counterContract.methods.getCount().call();
  }

  async incrementCount(signer = this.signer) {
    const { gasLimit, gasPrice } = await this.getTxGasQuotes(signer.address);
    const nonce = await web3.eth.getTransactionCount(signer.address);

    const tx = this.counterContract.methods.increment();
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: this.counterContract.options.address,
        from: this.signer.address,
        data: tx.encodeABI(),
        gasLimit,
        gasPrice,
        nonce,
      },
      this.signer.privateKey,
    );

    return await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  }

  private subscribe(onData: OnEventFn = () => null, onError?: OnEventFn) {
    try {
      const counterIncrementedLog = this.counterContract.events.CounterIncremented();

      counterIncrementedLog.on('data', event => {
        console.log('Event received:', event.returnValues);
        onData(event); // Trigger callback if it has specified during the module instantiation.
      });
      counterIncrementedLog.on('error', error => {
        console.error('Error occurred:', error);

        if (onError) {
          return onError(error);
        }

        throw error;
      });
    } catch (error) {
      console.error('Error occurred while subscribing to event logs', error);
      throw error;
    }
  }

  private async getTxGasQuotes(from: string) {
    const [gasLimit, gasPrice] = await Promise.all([web3.eth.estimateGas({ from }), web3.eth.getGasPrice()]);

    return { gasLimit, gasPrice };
  }
}
