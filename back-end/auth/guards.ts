import * as passport from "passport";

export const isLoggedIn = passport.authenticate("jwt", { session: false });