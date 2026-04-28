import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { pool } from "../db.js";

const router = express.Router();

//sign up
//redirect to login
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email],
    );

    if (existingUser.rowCount > 0) {
      return res.status(400).send("User already exists.");
    }

    bcrypt.genSalt(function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        try {
          await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hash],
          );
          res.status(201).send(`User registered with email: ${email}`);
        } catch (err) {
          throw err;
        }
      });
    });
  } catch (err) {
    throw err;
  }
});

//sign in
//fix this. return response/redirect to dashboard etc.
router.post("/signin", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

//sign out
//remove cookie, redirect to login page or home page. not yet working.
router.get("/signout", (req, res, next) => {
  req.logOut(function (err) {
    if (err) return next(err);
  });
});

//update email
//check cookie, update email for user
router.put("/user/email", async (req, res) => {
  const { newEmail, oldEmail, password } = req.body;

  try {
    await pool.query(
      "UPDATE users SET email=$1 WHERE email=$2 AND password=$3",
      [newEmail, oldEmail, password],
    );
    res.status(200).send(`Email updated from: ${oldEmail} to: ${newEmail}`);
  } catch (err) {
    throw err;
  }
});

//update password
//check cookie, update password for user
router.put("/user/password", async (req, res) => {
  const { newPassword, email, oldPassword } = req.body;

  try {
    await pool.query(
      "UPDATE users SET password=$1 WHERE email=$2 AND password=$3",
      [newPassword, email, oldPassword],
    );
    res.status(200).send(`Password updated for account: ${email}`);
  } catch (err) {
    throw err;
  }
});

//delete account
//check cookie, delete user
router.delete("/user/delete", async (req, res) => {
  const { email, password } = req.body;

  try {
    await pool.query("DELETE FROM users WHERE email=$1 AND password=$2", [
      email,
      password,
    ]);
    res.status(200).send(`User deleted with email: ${email}`);
  } catch (error) {
    throw error;
  }
});

//
function checkAuthenticated(req, res) {
  if (req.isAuthenticated()) {
  }
}

export default router;
