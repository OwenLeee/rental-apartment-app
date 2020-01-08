import * as express from "express";
import * as bodyParser from "body-parser";
import * as expressSession from "express-session";
import * as passport from "passport";
import * as cors from "cors";
import * as Knex from 'knex';
import { isLoggedIn } from "./auth/guards";

import { UserService } from "./services/UserService";
import { UserRouter } from "./routers/UserRouter";


const app = express();
const knexConfig = require('./knexfile');
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());


//middleware

const sessionMiddleware = expressSession({
  secret: "Tecky Academy teaches typescript",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
});

app.use(sessionMiddleware);


// add isLoggedIn Middleware!!!
console.log(isLoggedIn);


export const userService = new UserService(knex);
const userRouter = new UserRouter(userService);
app.use(`/users`, userRouter.router());



const PORT = 8080;
app.listen(PORT, () => {
	console.log(`Sever has started http://localhost:${PORT}`);
});