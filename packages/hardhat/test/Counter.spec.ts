import { expect } from 'chai';

import { deployCounterFixture, loadFixture } from './fixtures';

describe('Counter', function () {
  it('Should increment the counter and catch a confirmation event', async () => {
    const { counter } = await loadFixture(deployCounterFixture);

    expect(await counter.getCount()).to.equal(0);

    await expect(counter.increment()).to.emit(counter, 'CounterIncremented').withArgs(1);

    expect(await counter.getCount()).to.equal(1);
  });
});
