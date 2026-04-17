import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import * as db from './queries.js';
import session from 'express-session';
import passport from 'passport';
import './strategies/passportLocal.js'

const app = express();
const port = Number(process.env.EX_PORT);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (request, response) => {
  response.json({info: 'Node.js, Express, and Postgres API'});
});

//app.get('/signin', db.getUser);
//app.get authenticated
app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users/register', db.createUser);
app.put('/users/email', db.updateUserEmail);
app.put('/users/password', db.updateUserPassword);
app.delete('/users/delete', db.deleteUser);

app.listen(port, () => {
  console.log(`Api runnning on port ${port}.`);
});