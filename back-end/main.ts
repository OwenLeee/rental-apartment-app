import * as express from "express";
import * as bodyParser from "body-parser";
import * as expressSession from "express-session";
import * as passport from "passport";
import * as cors from "cors";
import * as Knex from 'knex';
import { isLoggedIn } from "./auth/guards";

import { UserService } from "./services/UserService";
import { UserRouter } from "./routers/UserRouter";
import { ListingService } from "./services/ListingService";
import { ListingRouter } from "./routers/ListingRouter";
import { ReferenceService } from "./services/ReferenceService";
import { ReferenceRouter } from "./routers/ReferenceRouter";
import { SearchResultService } from "./services/SearchResultService";
import { SearchResultRouter } from "./routers/SearchResultRouter";
import { ApartmentDetailsService } from "./services/ApartmentDetailsService";
import { ApartmentDetailsRouter } from "./routers/ApartmentDetailsRouter";


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
app.use('/users', userRouter.router());


const listingService = new ListingService(knex);
const listingRouter = new ListingRouter(listingService);
app.use('/listing', listingRouter.router()); // add isLoggedIn Middleware!!!

const referenceService = new ReferenceService(knex);
const referenceRouter = new ReferenceRouter(referenceService);
app.use('/reference', referenceRouter.router()); // add isLoggedIn Middleware!!!

const searchService = new SearchResultService(knex);
const searchRouter = new SearchResultRouter(searchService);
app.use('/search', searchRouter.router());

const apartmentDetailsService = new ApartmentDetailsService(knex);
const apartmentDetailsRouter = new ApartmentDetailsRouter(apartmentDetailsService);
app.use('/apartmentDetails', apartmentDetailsRouter.router());


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server has started http://localhost:${PORT}`);
});