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

const deviceSchema = Joi.object({
  deviceName: Joi.string().required(),
  room: Joi.string().required(),
  deviceModule: Joi.string().required(),
  topic: {
    subscribe: Joi.string().required(),
    ack: Joi.string().required(),
    publish: Joi.string().required(),
  },
  ack: {
    door: Joi.string().required(),
    pir: Joi.string().required(),
  },
  request: {
    door: Joi.string().required(),
    pir: Joi.string().required(),
    api: Joi.string().required(),
  },
  pin: {
    door: Joi.number().required(),
    pir: Joi.number().required(),
  },
});

const validateCreateConfig = validator(createConfigSchema);
const validateUpdateConfig = validator(updateConfigSchema);
const validateSchedule = validator(scheduleSchema);
const validateDevice = validator(deviceSchema);

export { validateCreateConfig, validateUpdateConfig, validateSchedule, validateDevice };
