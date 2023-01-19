import Joi from "joi";

const validator = schema => payload =>
  schema.validate(payload, { abortEarly: false });

const createConfigSchema = Joi.object({
  deviceID: Joi.string().required(),
  room: Joi.string().required(),
  loopTime: Joi.number().required(),
});

const updateConfigSchema = Joi.object({
  loopTime: Joi.number().required(),
});

const validateCreateConfig = validator(createConfigSchema);
const validateUpdateConfig = validator(updateConfigSchema);

export { validateCreateConfig, validateUpdateConfig };
