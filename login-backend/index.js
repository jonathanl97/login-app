import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db.js";
import authRouter from "./routes/auth.js";
import initializePassport from "./strategies/localPassport.js";

const pgSession = connectPgSimple(session);

const app = express();
const port = Number(process.env.EX_PORT);

//not finished
/*
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173/",
      //"http://localhost:5173/signin",
      "http://localhost:8080/",
      //"http://localhost:8080/signin",
    ];

    
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      //callback(new Error("Not allowed by cors"));
    }
    
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
*/

//app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport(passport);

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);

//not finished
//app.options(cors(corsOptions));

app.listen(port, () => {
  console.log(`Api runnning on port ${port}.`);
});
