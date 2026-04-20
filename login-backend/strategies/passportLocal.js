import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { pool } from '../db.js';
import bcrypt from 'bcrypt';


passport.use(new LocalStrategy(function verify(email, password, cb) {
  pool.query('SELECT * FROM users WHERE email=$1,', [email], function(err, row) {
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect email or password.' }); }

    bcrypt.compare(password, row.password, function(err, res) {
      if (err) { return cb(err); }
      if (!res) { return cb(null, false, { message: 'Incorrect email or password.' }); }

      return cb(null, res); //return cb(null, row.email);??
    });
  });
}));