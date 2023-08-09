import { ethers } from 'hardhat';

async function main() {
  const signers = await ethers.getSigners();
  const [defaultAccount] = signers;

  console.log('Deploying Counter contract with the account:', defaultAccount.address);

  const Counter = await ethers.getContractFactory('Counter');
  const counter = await Counter.deploy();

  await counter.waitForDeployment();
  const counterContractAddress = await counter.getAddress();

  console.log('Counter contract deployed to:', counterContractAddress);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
