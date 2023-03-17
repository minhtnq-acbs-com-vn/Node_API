import jwt from "jsonwebtoken";

const generateToken = (payload, expiredTime) => {
  return jwt.sign(payload, `${process.env.apiKey}`, {
    expiresIn: expiredTime,
  });
};

const validateToken = (req, res, next) => {
  const authHeader = req.headers["auth"];
  if (authHeader === undefined) throw new Error(`Invalid token`);
  jwt.verify(authHeader, `${process.env.apiKey}`, (err, payload) => {
    if (err !== null) throw new Error(`Invalid token`);
    next();
  });
};

export { generateToken, validateToken };
