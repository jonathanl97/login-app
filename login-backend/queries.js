import { pool } from "./db.js";
import { hashPassword } from "./utils/helper.js";

const getUsers = async (request, response) => {
  try {
    const results = await pool.query('SELECT * FROM users ORDER BY id ASC');
    response.status(200).json(results.rows);
  } catch (error) {
    throw error;
  };
};

const getUserById = async (request, response) => {
  const id = parseInt(request.params.id, 10);

  try {
    const results = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
    response.status(200).json(results.rows);
  } catch (error) {
    throw error;
  };
};

const createUser = async (request, response) => {
  const { email, password } = request.body;

  const hashedPassword = hashPassword(password);

  try {
    const results = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );
    response.status(201).send(`User registered with email: ${email}`);
  } catch (error) {
    throw error;
  };
};

const updateUserEmail = async (request, response) => {
  const { newEmail, oldEmail, password } = request.body

  try {
    await pool.query('UPDATE users SET email=$1 WHERE email=$2 AND password=$3', 
      [newEmail, oldEmail, password]
    )
    response.status(200).send(`Email updated from: ${oldEmail} to: ${newEmail}`)
  } catch (error) {
    throw error
  }
};

const updateUserPassword = async (request, response) => {
  const { newPassword, email, oldPassword } = request.body;

  try {
    await pool.query('UPDATE users SET password=$1 WHERE email=$2 AND password=$3',
      [newPassword, email, oldPassword]
    );
    response.status(200).send(`Password updated for account: ${email}`);
  } catch (error) {
    throw error;
  };
};

const deleteUser = async (request, response) => {
  //const id = parseInt(request.params.id, 10);
  const { email, password } = request.body;

  try {
    await pool.query('DELETE FROM users WHERE email=$1 AND password=$2', [email, password]);
    response.status(200).send(`User deleted with email: ${email}`);
  } catch (error) {
    throw error;
  };
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUserEmail,
  updateUserPassword,
  deleteUser,
};