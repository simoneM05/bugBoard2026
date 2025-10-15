import { bool, cleanEnv, port, str } from 'envalid';

export const ValidateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    SECRET_KEY: str(),
    LOG_FORMAT: str(),
    LOG_DIR: str(),
    ORIGIN: str(),
    REFRESH_TOKEN_SECRET: str(),
    CREDENTIALS: bool(),
  });
};
