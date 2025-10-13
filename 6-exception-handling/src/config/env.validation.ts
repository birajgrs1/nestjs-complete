import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  ENV_MODE: Joi.string()
    .valid('DEVELOPMENT', 'PRODUCTION')
    .default('DEVELOPMENT'),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.boolean().default(false),
  DB_AUTO_LOAD_ENTITIES: Joi.boolean().default(true),
  SECRET_KEY: Joi.string().required(),
});
