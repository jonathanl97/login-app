import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import connectPgSimple from 'connect-pg-simple';
import * as db from './queries.js';
import { pool } from "./db.js";
import authRouter from './routes/auth.js';
import initializePassport from './strategies/localPassport.js'

const pgSession = connectPgSimple(session);

const app = express();
const port = Number(process.env.EX_PORT);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

initializePassport(passport);

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: 'session',
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);

/* Add these to authRouter
app.post('/users/register', db.createUser);
app.put('/users/email', db.updateUserEmail);
app.put('/users/password', db.updateUserPassword);
app.delete('/users/delete', db.deleteUser);
*/

app.listen(port, () => {
  console.log(`Api runnning on port ${port}.`);
});