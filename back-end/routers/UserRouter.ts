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
        router.post("/login/google", this.loginGoogle);
        router.post("/signup", this.signup);
        router.get('/profile/?:email', this.getUserInfo);
        router.get('/profile/rental/?:email', this.getProfileInfo)
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
            const fetchResponse = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`);
            const result = await fetchResponse.json();
            if (result.error) {
                res.status(401).json({ msg: "Wrong Access Token" });
                return;
            }
            let user = (await this.userService.getUserbyEmail(result.email));
            // Create a new user if the user does not exist
            if (!user) {
                let password: string = randomPassword();
                const hashedpassword: string = await hashPassword(password);
                user = (await this.userService.createUser(result.email, hashedpassword))[0];
                await this.userService.createUserInfo(user.id, result.name, result.picture.data.url) //validate
            }

            const payload = {
                id: user.id,
                email: user.email
            };
            console.log(payload)
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            res.status(200).json({
                message: 'success',
                token: token
            });
        } catch (error) {
            res.status(500).json({ msg: "internal Error" })
        }
    }

    private loginGoogle = async (req: Request, res: Response) => {
        try {
            if (!req.body.profileObj) {
                res.status(401).json({ msg: "Google Login Failure" });
                return;
            }
            const { profileObj } = req.body;
            let user = (await this.userService.getUserbyEmail(profileObj.email));
            // Create a new user if the user does not exist
            if (!user) {
                let password: string = randomPassword();
                const hashedpassword: string = await hashPassword(password);
                user = (await this.userService.createUser(profileObj.email, hashedpassword))[0];
                await this.userService.createUserInfo(user.id, profileObj.name, profileObj.imageUrl) //validate
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
            res.status(500).json({ msg: "internal Error" })
        }
    }

    private signup = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            let user = await this.userService.getUserbyEmail(email)[0];
            if (!user) {
                let hashedpassword: string = await hashPassword(password)
                user = (await this.userService.createUser(email, hashedpassword))[0];
                await this.userService.createUserInfo(user.id, "", "");
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

    private getUserInfo = async (req: Request, res: Response) => {
        try {
            const { email } = req.params;
            if (!email) {
                res.status(401).json({ msg: "Params Error" });
                return
            }
            const user = await this.userService.getUserbyEmail(email);
            if (!user) {
                res.status(404).json({ msg: "User Not found", userinfo: null })
            } else {
                console.log(user)
                const userinfo = await this.userService.getUserInfo(user.id);
                if (!userinfo) {
                    res.status(404).json({ msg: "UserInfo Not found", userinfo: null })
                } else {
                    res.status(200).json({
                        msg: "Get Info Success",
                        email: user.email,
                        userinfo: userinfo
                    });
                }
            }
        } catch (e) {
            res.status(500).json({ msg: "Internal Error" });
        }
    }

    private getProfileInfo = async (req: Request, res: Response) => {
        try {
            const { email } = req.params;
            if (!email) {
                res.status(401).json({ msg: "Params Error" });
                return
            }
            const user = await this.userService.getUserbyEmail(email);
            if (!user) {
                res.status(404).json({ msg: "User Not found", userinfo: null })
            } else {
                const userinfo = await this.userService.getUserInfo(user.id);
                if (!userinfo) {
                    res.status(404).json({
                        msg: "UserInfo Not found",
                        email: user.email,
                    })
                }
                const ownedApartments = await this.userService.getUserRentalInfo(user.id);

                if (!ownedApartments) {
                    res.status(404).json({
                        msg: "Apartmentdetail Not found",
                        email: user.email,
                        name: userinfo.name,
                        icon: userinfo.icon
                    })
                }

                for (let apartment of ownedApartments) {
                    const photos = await this.userService.getApartmentPhotos(apartment.id);
                    Object.assign(apartment, { photos: photos })
                }
                console.log(ownedApartments)

                let payload = {
                    msg: "Apartmentdetail Not found",
                    email: user.email,
                    name: userinfo.name,
                    icon: userinfo.icon,
                    apartments: ownedApartments
                }

                res.status(200).json({
                    msg: "Get Info Success",
                    payload: payload
                });
            }
        } catch (e) {
            res.status(500).json({ msg: "Internal Error" });
        }
    }
}

