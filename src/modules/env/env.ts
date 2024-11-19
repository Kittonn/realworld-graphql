import { z } from 'zod';

import { Environment } from '@/shared/enums';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  NODE_ENV: z.nativeEnum(Environment).default(Environment.DEVELOPMENT),
  DATABASE_URL: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_ACCESS_EXPIRES_IN: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
