import { z } from 'zod';

const ConfigSchema = z.object({
  NODE_ENV: z.string().optional(),
  COUNTER_CONTRACT_ADDRESS: z
    .string()
    .nonempty('Please specify an address of the Counter smart contract to interact with'),
  PROVIDER_APP_ID: z.string().optional(),
  PROVIDER_WS_URL: z.string(),
  WALLET_PRIVATE_KEY: z.string(),
});

export const config = ConfigSchema.parse(process.env);
