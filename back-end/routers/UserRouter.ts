import * as express from "express";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import * as jwtSimple from "jwt-simple";
import jwt from "../auth/jwt";
import { checkPassword } from "../auth/hash";

export class UserRouter {
    constructor(private userService: UserService) { }

    router() {
        const router = express.Router();
        router.post("/login", this.post);
        return router;
    }

    private post = async (req: Request, res: Response) => {
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
                res.status(401).json({ msg: "Wrong Username/Password" });
                return;
            }
            // Step 3: create payload
            const payload = {
                id: user.id,
                useremail: user.email
            };
            // Step 4: generate token
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            // Step 5: return token
            res.json({
                token: token
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ msg: e.toString() });
        }
    };
}
