import * as express from "express";
import * as bodyParser from "body-parser";
import * as expressSession from "express-session";
import * as passport from "passport";
import * as cors from "cors";

//environment
import * as dotenv from 'dotenv';
dotenv.config();

//database - knex
import * as Knex from 'knex';
const knexConfig = require('./knexfile');
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//middleware
const sessionMiddleware = expressSession({
  secret: "Tecky Academy teaches typescript",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
});

app.use(sessionMiddleware);
app.use(passport.initialize());

//user Router & Service
import { UserService } from "./services/UserService";
import { UserRouter } from "./routers/UserRouter";

//example
import { ExampleService } from "./services/ExampleService";
import { ExampleRouter } from "./routers/ExampleRouter";


import { isLoggedIn } from "./Auth/guards";

export const userService = new UserService(knex);
const userRouter = new UserRouter(userService);

//example
const exampleService = new ExampleService(knex);
const exampleRouter = new ExampleRouter(exampleService); 

//version
const API_VERSION = "/api/v1";

app.use(`${API_VERSION}/users`, userRouter.router());
app.use(`${API_VERSION}/todos`, isLoggedIn, exampleRouter.router());

app.get(`${API_VERSION}/greeting`, isLoggedIn, (req, res) => {
	res.status(200).json({ message: "hello, world" });
});

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`I'm listening to Port: ${PORT}`);
});