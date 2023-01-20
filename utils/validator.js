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

const scheduleSchema = Joi.object({
  deviceID: Joi.string().required(),
  deviceModule: Joi.string().required(),
  room: Joi.string().required(),
  timeOn: Joi.number().required(),
  timeOff: Joi.number().required(),
  repeat: Joi.string().required(),
});

const validateCreateConfig = validator(createConfigSchema);
const validateUpdateConfig = validator(updateConfigSchema);
const validateSchedule = validator(scheduleSchema);

export { validateCreateConfig, validateUpdateConfig, validateSchedule };
