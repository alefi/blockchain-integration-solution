import { z } from 'zod';

const ConfigSchema = z.object({
  PROVIDER_APP_ID: z.string().optional(),
  PROVIDER_HTTP_URL: z.string().optional(),
  WALLET_PRIVATE_KEY: z.string().optional(),
});

export const config = ConfigSchema.parse(process.env);
