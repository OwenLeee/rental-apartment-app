import * as express from "express";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import * as jwtSimple from "jwt-simple";
import fetch from "node-fetch";
import jwt from "../auth/jwt";
import { hashPassword, checkPassword } from "../auth/hash";
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
            const { email, password } = req.body;

            // Step 2: get User
            const user = await this.userService.getUserbyEmail(email);
            if (!user) {
                res.status(404).json({ msg: "User Not Found" });
                return;
            }
            if (!(await checkPassword(password, user.password))) {
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
                token: token,
                msg: "Login Success"
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ msg: "Internal Error" });
        }
    };

    private loginFacebook = async (req: Request, res: Response) => {
        try {
            if (!req.body.accessToken) {
                res.status(401).json({ msg: "Wrong Access Token" });
                return;
            }
            const { accessToken } = req.body;
            console.log(accessToken)
            const fetchResponse = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`);
            console.log(fetchResponse);
            const result = await fetchResponse.json();
            console.log(result);
            if (result.error) {
                res.status(401).json({ msg: "Wrong Access Token" });
                return;
            }
            let user = (await this.userService.getUserbyEmail(result.email))[0];
            console.log(user)
            // Create a new user if the user does not exist
            if (!user) {
                let password: string = randomPassword();
                const hashedpassword: string = await hashPassword(password);
                user = (await this.userService.createUser(result.email, hashedpassword))[0];

            }
            const payload = {
                id: user.id,
                email: user.email
            };
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            res.status(200).json({
                message: 'success',
                token: token
            });
        } catch (error) {
            res.status(500).json({ msg: "internal Error"})
        }
    }

    private signup = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            let user = await this.userService.getUserbyEmail(email);
            if (!user) {
                let hashedpassword: string = await hashPassword(password)
                user = (await this.userService.createUser(email, hashedpassword))[0];
                const payload = {
                    id: user.id,
                    email: user.email
                };
                const token = jwtSimple.encode(payload, jwt.jwtSecret);
                res.status(200).json({
                    message: "success",
                    token: token
                });
            } else {
                res.status(403).json({ msg: "repeated email" }) //403 - Forbidden
                return;
            }
        } catch (error) {
            res.status(500).json({ msg: "internal Error" }) //500 - Internal Error
        }
    }
}
