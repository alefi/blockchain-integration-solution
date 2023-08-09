import { type CounterContract, counter } from '../web3/contracts';
import { signer } from '../web3';
import { CounterService } from './counter.service';

describe('CounterService', () => {
  let counterService: CounterService;

  const dummyReceipt = {
    transactionHash: 'Dummy-address',
    transactionIndex: 0,
    blockHash: 'Dummy-address',
  };

  beforeAll(() => {
    // TODO Get rid of this mock: tune-up the ganache to allow run tests with no such ugly mocking (ganache's config should correlate with a hardhat config)
    const counterContractMock = {
      ...counter,
      events: {
        ...counter.events,
        CounterIncremented: () => ({ on: () => undefined }),
      },
      methods: {
        ...counter.methods,
        getCount: () => ({ call: () => 0 }),
        increment: () => ({ send: () => dummyReceipt }),
      },
    };

    // TODO use onData and onError callbacks in tests (jest mock)
    counterService = new CounterService(counterContractMock as unknown as CounterContract, signer);
  });

  it('should get current counter value', async () => {
    expect(await counterService.getCurrentCount()).toEqual(0);
  });

  it.skip('should increment counter value', async () => {
    expect(await counterService.incrementCount(signer)).toStrictEqual(dummyReceipt);
  });
});
