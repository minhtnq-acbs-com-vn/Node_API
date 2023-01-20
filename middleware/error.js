const errorHandler = (err, req, res, next) => {
  res.status(404).json({ success: false, error: err.message || "Server Dead" });
};

export { errorHandler };
