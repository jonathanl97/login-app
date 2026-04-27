import express from "express";
import passport from "passport";

const router = express.Router();

//sign up

//sign in

//fix this. return response/redirect to dashboard etc.
router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
  }),
);

//sign out

//update email

//update password

//delete account

export default router;
