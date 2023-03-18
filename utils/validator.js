import Joi from "joi";

const validator = schema => payload =>
  schema.validate(payload, { abortEarly: false });

const createConfigSchema = Joi.object({
  userID: Joi.string().required(),
  room: Joi.string().required(),
  loopTime: Joi.number().required(),
});

const createScheduleSchema = Joi.object({
  userID: Joi.string().required(),
  deviceName: Joi.string().required(),
  deviceModule: Joi.string().required(),
  room: Joi.string().required(),
  timeOn: Joi.string().required(),
  timeOff: Joi.string().required(),
  repeat: Joi.string().required(),
  dayOfTheWeek: Joi.string().required(),
  request: Joi.string().required(),
});

const updateScheduleSchema = Joi.object({
  userID: Joi.string().required(),
  timeOn: Joi.string().required(),
  timeOff: Joi.string().required(),
  repeat: Joi.string().required(),
  dayOfTheWeek: Joi.string().required(),
  request: Joi.string().required(),
});

const validateCreateConfig = validator(createConfigSchema);
const validateCreateSchedule = validator(createScheduleSchema);
const validateUpdateSchedule = validator(updateScheduleSchema);

export { validateCreateConfig, validateCreateSchedule, validateUpdateSchedule };
