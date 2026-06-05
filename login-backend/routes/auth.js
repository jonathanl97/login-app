import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { pool } from "../db.js";

const router = express.Router();

//sign up
router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;

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
          const response = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email AS username",
            [name, email, hash],
          );
          const user = {
            id: response.rows[0].id,
            username: response.rows[0].username,
          };
          req.logIn(user, function (err) {
            if (err) {
              return next(err);
            }
            res
              .status(201)
              .send(`User registered and signed in with email: ${email}`);
          });
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
      //return err; //change to redirect to login/register
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      //change
      return res.send("signed in");
    });
  })(req, res, next);
});

//sign out //fix this
//remove cookie, redirect to login page or home page. not yet working.
router.post("/signout", async (req, res, next) => {
  req.logOut(function (err) {
    if (err) return next(err);
  });
  //res.clearCookie("connect.sid");
  res.send(200);
});

//get account/user name
router.post("/user/account", checkAuthenticated, async (req, res) => {
  const results = await pool.query("SELECT name FROM users WHERE id=$1", [
    req.user.id,
  ]);
  res.json(results.rows[0].name);
});

router.post("/user/getuser", async (req, res) => {
  if (req.isAuthenticated()) {
    const user = { name: req.user.name, email: req.user.email, signedIn: true };
    res.json(user);
  } else {
    res.status(400).json({ name: null, email: null, signedIn: false });
  }
});

//update email
router.put("/user/email", checkAuthenticated, async (req, res) => {
  const { newEmail, oldEmail, password } = req.body;

  const { id, isMatch } = await verifyUser(oldEmail, password);

  if (id == req.user.id && isMatch) {
    try {
      await pool.query("UPDATE users SET email=$1 WHERE email=$2", [
        newEmail,
        oldEmail,
      ]);
      res.status(200).send(`Email updated from: ${oldEmail} to: ${newEmail}`);
    } catch (err) {
      throw err;
    }
  } else {
    res.send("Incorrect credentials");
  }
});

//update password
router.put("/user/password", checkAuthenticated, async (req, res) => {
  const { newPassword, email, oldPassword } = req.body;

  const { id, isMatch } = await verifyUser(email, oldPassword);

  if (id == req.user.id && isMatch) {
    try {
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
    } catch (err) {
      throw err;
    }
  } else {
    res.send("Incorrect credentials");
  }
});

//delete account
router.delete("/user/delete", checkAuthenticated, async (req, res, next) => {
  const { email, password } = req.body;

  const { id, isMatch } = await verifyUser(email, password);

  if (id == req.user.id && isMatch) {
    try {
      await pool.query("DELETE FROM users WHERE email=$1", [email]);
      res.status(200).send(`User deleted with email: ${email}`);
    } catch (err) {
      throw err;
    }
  } else {
    res.send("Incorrect credentials");
  }

  req.logOut(function (err) {
    if (err) return next(err);
  });
});

//
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    //res.status(400).send();
  }
}

async function verifyUser(email, password) {
  try {
    const results = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (results.rows.length > 0) {
      const user = results.rows[0];

      const match = await bcrypt.compare(password, user.password);

      if (match) {
        return {
          id: user.id,
          isMatch: match,
        };
      } else {
        return {
          id: -1,
          isMatch: match,
        };
      }
    }
  } catch (err) {
    throw err;
  }
}

export default router;
