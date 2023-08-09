import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Counter', function () {
  it('Should increment the counter and catch a confirmation event', async () => {
    const Counter = await ethers.getContractFactory('Counter');
    const counter = await Counter.deploy();
    await counter.waitForDeployment();

    expect(await counter.getCount()).to.equal(0);

    await expect(counter.increment()).to.emit(counter, 'CounterIncremented').withArgs(1);

    expect(await counter.getCount()).to.equal(1);
  });
});
