import { ethers } from 'hardhat';

export async function deployCounterFixture() {
  const Counter = await ethers.getContractFactory('Counter');
  const counter = await Counter.deploy();
  await counter.waitForDeployment();

  return { counter };
}
