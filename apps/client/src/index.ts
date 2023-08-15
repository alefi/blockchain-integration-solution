import { signer, web3 } from './web3';
import { CounterServiceFactory } from './counter';

const onDataCallback = (receipt: unknown) => {
  console.log('Transaction receipt:', receipt);

  // As an option, here we could parse an event payload and notify consumers through a message queue.
  // But, since it is a demo project, and the Web socket provider will keep a connection, we will do manual disconnect instead.
  setTimeout(() => web3.currentProvider?.disconnect(), 3000);
};

async function main() {
  const counterService = CounterServiceFactory(signer, onDataCallback);

  console.log('Connected with account:', signer.address);
  const currentCount = await counterService.getCurrentCount();
  console.log('Current count:', currentCount);

  await counterService.incrementCount();
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
