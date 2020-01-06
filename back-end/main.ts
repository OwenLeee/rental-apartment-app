import * as express from "express";
import * as bodyParser from "body-parser";
import * as expressSession from "express-session";
import * as passport from "passport";
import * as cors from "cors";

import * as dotenv from 'dotenv';
dotenv.config();

import * as Knex from 'knex';
const knexConfig = require('./knexfile');
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sessionMiddleware = expressSession({
  secret: "Tecky Academy teaches typescript",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
});

app.use(sessionMiddleware);
app.use(passport.initialize());

import "./passport";

import { UserService } from "./services/UserService";
import { UserRouter } from "./routers/UserRouter";

import ToDoService from "./services/ToDoService";
import ToDoRouter from "./routers/ToDoRouter";

import { isLoggedIn } from "./guards";

export const userService = new UserService(knex);
const userRouter = new UserRouter(userService);

const toDoService = new ToDoService(knex);
const toDoRouter = new ToDoRouter(toDoService);

const API_VERSION = "/api/v1";

app.use(`${API_VERSION}/users`, userRouter.router());
app.use(`${API_VERSION}/todos`, isLoggedIn, toDoRouter.router());

app.get(`${API_VERSION}/greeting`, isLoggedIn, (req, res) => {
	res.status(200).json({ message: "hello, world" });
});

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`I'm listening to Port: ${PORT}`);
});