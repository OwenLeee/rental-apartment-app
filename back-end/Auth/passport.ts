import * as passport from "passport";
import * as passportJWT from "passport-jwt";
import jwt from "./jwt";
import { userService } from "../main";

const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

passport.use(
  new JWTStrategy(
    {
      secretOrKey: jwt.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (payload: { id: number, username: string }, done) => {
      // get username from payload
      // get User
      const user = await userService.getUser(payload.username);
      // Pass user to next handler
      if (user) {
        // demo query
        // const testUser = Object.assign({ nickname: "handsome" }, user);
        return done(null, user);
      } else {
        return done(new Error("User not Found"), null);
      }
    }
  )
);
