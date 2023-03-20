import bcrypt from "bcrypt";

const hashPass = async plain => {
  const hash = await bcrypt.hash(plain, 10);
  const result = await bcrypt.compare(plain, hash);
  if (!result) return false;
  return hash;
};

export { hashPass };
