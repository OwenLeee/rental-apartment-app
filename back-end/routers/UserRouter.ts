import * as express from "express";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import * as jwtSimple from "jwt-simple";
import jwt from "../auth/jwt";
import { checkPassword } from "../auth/hash";
import randomPassword from "../auth/genPassword";

export class UserRouter {
    constructor(private userService: UserService) { }

    router() {
        const router = express.Router();
        router.post("/login", this.login);
        router.post("/login/facebook", this.loginFacebook);
        router.post("/signup", this.signup)
        return router;
    }

    private login = async (req: Request, res: Response) => {
        try {
            // Step 1: validation
            if (!req.body.email || !req.body.password) {
                res.status(401).json({ msg: "Wrong Email/Password" });
                return;
            }
            const { user: email, password } = req.body;
            console.log(email, password);
            // const user = (await this.userService.getUser(username))[0];
            // Step 2: get User
            const user = await this.userService.getUserbyEmail(email);
            if (!user || !(await checkPassword(password, user.password))) {
                res.status(401).json({ msg: "Wrong Password" });
                return;
            }
            // Step 3: create payload which store in jwt
            const payload = {
                id: user.id,
                email: user.email
            };
            // Step 4: generate token
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            // Step 5: return token
            res.status(200).json({
                token: token
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ msg: e.toString() });
        }
    };

    private loginFacebook = async (req: Request, res: Response) => {
        try {
            if (!req.body.accessToken) {
                res.status(401).json({ msg: "Wrong Access Token!" });
                return;
            }
            const { accessToken } = req.body;
            const fetchResponse = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`);
            const result = await fetchResponse.json();
            if (result.error) {
                res.status(401).json({ msg: "Wrong Access Token!" });
                return;
            }
            let user = (await this.userService.getUserbyEmail(result.email))[0];

            // Create a new user if the user does not exist
            if (!user) {
                const password: string = randomPassword()
                user = (await this.userService.createUser(result.email, password))[0];

            }
            const payload = {
                id: user.id,
                email: user.email
            };
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            res.status(200).json({
                token: token
            });
        } catch (error) {
            res.status(500).json({ msg: error.toString() })
        }
    }

    private signup = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            let user = await this.userService.getUserbyEmail(email);
            if (!user) {
                user = (await this.userService.createUser(email, password))[0];
                const payload = {
                    id: user.id,
                    email: user.email
                };
                const token = jwtSimple.encode(payload, jwt.jwtSecret);
                res.status(200).json({
                    message:"success", 
                    token: token
                });
            } else {
                console.log("repeated email");
                res.status(403).json({ msg: console.error.toString() }) //403 - Forbidden
                return;
            }
        } catch (error) {
            res.status(500).json({ msg: error.toString() }) //500 - Internal Error
        }
    }
}
