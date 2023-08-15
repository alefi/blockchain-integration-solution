import { config } from '../config';
import { signer } from '../web3';
import { deployCounterContract } from '../test/scripts/deploy-counter-contract';
import type { CounterService } from './counter.service';
import { CounterServiceFactory } from '.';

describe('CounterService', () => {
  let counterService: CounterService;
  let onDataSpy: jest.Func;
  let onErrorSpy: jest.Func;

  beforeAll(async () => {
    /**
     * This shouldn't be as a part of the application deployment process.
     * Actually, this is a part of a future e2e test.
     * Since we haven't got API, let's tract is a trade-off for a while.
     */
    await deployCounterContract(signer);
  });

  beforeAll(() => {
    onDataSpy = jest.fn();
    onErrorSpy = jest.fn();
  });

  beforeAll(() => {
    counterService = CounterServiceFactory(signer, onDataSpy, onErrorSpy);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should get current counter value', async () => {
    expect(await counterService.getCurrentCount()).toEqual(BigInt(0));
  });

  it('should increment counter value', async () => {
    await expect(counterService.incrementCount(signer)).resolves.not.toThrow();

    expect(onErrorSpy).not.toHaveBeenCalled();
    expect(onDataSpy).toBeCalledWith({
      address: config.COUNTER_CONTRACT_ADDRESS.toLowerCase(),
      blockHash: expect.any(String), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
      blockNumber: 2n,
      data: '0x0000000000000000000000000000000000000000000000000000000000000001',
      event: 'CounterIncremented',
      logIndex: 0n,
      raw: {
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        topics: ['0x3cf8b50771c17d723f2cb711ca7dadde485b222e13c84ba0730a14093fad6d5c'],
      },
      removed: false,
      returnValues: { '0': 1n, __length__: 1, value: 1n },
      signature: '0x3cf8b50771c17d723f2cb711ca7dadde485b222e13c84ba0730a14093fad6d5c',
      topics: ['0x3cf8b50771c17d723f2cb711ca7dadde485b222e13c84ba0730a14093fad6d5c'],
      transactionHash: '0xbd48ade08b135130895d9c4edcb67d0ef8a922eb532579ac291cb9e93000bf09',
      transactionIndex: 0n,
    });
  });
});
