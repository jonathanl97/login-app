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
router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      console.log("user not found");
      //return err; //change to redirect to login
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      //change
      return res.send(user);
    });
    console.log(req.user);
  })(req, res, next);
});

//sign out
//remove cookie, redirect to login page or home page. not yet working.
router.get("/signout", (req, res, next) => {
  console.log(req.user);
  req.logOut(function (err) {
    if (err) return next(err);
    console.log(req.user);
  });
});

//update email
//check cookie, checkAuthenticated update email for user
router.put("/user/email", checkAuthenticated, async (req, res) => {
  const { newEmail, oldEmail, password } = req.body;

  try {
    await pool.query("UPDATE users SET email=$1 WHERE email=$2", [
      newEmail,
      oldEmail,
    ]);
    res.status(200).send(`Email updated from: ${oldEmail} to: ${newEmail}`);
  } catch (err) {
    throw err;
  }
});

//update password
//checkauthenticated
router.put("/user/password", checkAuthenticated, async (req, res) => {
  const { newPassword, email, oldPassword } = req.body;

  const results = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  if (results.rows.length > 0) {
    const user = results.rows[0];

    //bcrypt
    bcrypt.genSalt(function (err, salt) {
      bcrypt.hash(newPassword, salt, async function (err, hash) {
        try {
          await pool.query("UPDATE users SET password=$1 WHERE email=$2", [
            hash,
            email,
          ]);
          res.status(200).send(`Password updated for account: ${email}`);
        } catch (err) {
          throw err;
        }
      });
    });
  }
});

//delete account
//checkauthenticated
router.delete("/user/delete", checkAuthenticated, async (req, res) => {
  const { email, password } = req.body;

  //sign out user and delete/expire session+cookie

  try {
    await pool.query("DELETE FROM users WHERE email=$1", [email]);
    res.status(200).send(`User deleted with email: ${email}`);
  } catch (err) {
    throw err;
  }
});

//
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("not authenticated");
    //add error
  }
}

export default router;
