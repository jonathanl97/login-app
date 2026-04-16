import bcrypt from 'bcrypt';

function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

export {
  hashPassword,
};