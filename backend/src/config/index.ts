import { config } from 'dotenv';
config();

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, REFRESH_TOKEN_SECRET } = process.env;
