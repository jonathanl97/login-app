import express from 'express';
import passport from 'passport';

//passport
let router = express.Router();

//sign up

//sign in
router.post('signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));

//sign out

//update email

//update password

//delete account