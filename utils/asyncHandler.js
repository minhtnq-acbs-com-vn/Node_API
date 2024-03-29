const asyncHandler = controller => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (e) {
    return next(e);
  }
};

export { asyncHandler };
