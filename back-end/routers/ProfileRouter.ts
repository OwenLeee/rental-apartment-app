import * as express from 'express';
import { ProfileService } from '../services/ProfileService';

export class ProfileRouter {

    constructor(private profileService: ProfileService) { }

    public router() {
        const router = express.Router();

        router.post('/', this.addToFav)
        router.get('/apartment', this.getApartmentList)
        router.get('/posting', this.getPostingApartmentList)
        router.get('/:id', this.getPersonalInfo)

        return router;
    }


    private addToFav = async (req: express.Request, res: express.Response) => {
        try {
            if (req.user) {
                await this.profileService.favApartment(req.user['id'], req.body.rental_apartment_ID);
            } else {
                res.status(400);
            }
            res.json({ result: true });
        }
        catch (e) {
            res.status(500).json({ result: false });
            console.error('addToFav error is found...');
            console.error(e.message);
        }
    }

    private getApartmentList = async (req: express.Request, res: express.Response) => {
        try {
            if (req.user) {
                res.json({ result: true, listFavData: await this.profileService.listFavApartment(req.user['id']) });
            } else {
                res.status(400);
            }
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('addToFav error is found...');
            console.error(e.message);
        }
    }

    private getPostingApartmentList = async (req: express.Request, res: express.Response) => {
        try {
            if (req.user) {
                res.json({ result: true, listPostData: await this.profileService.listPostApartment(req.user['id']) });
            } else {
                res.status(400);
            }
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('addToFav error is found...');
            console.error(e.message);
        }

    }

    private getPersonalInfo = async (req: express.Request, res: express.Response) => {
        try {
            if (req.user) {
                res.json({ result: true, personalInfo: await this.profileService.listFavApartment(req.user['id']) });
            } else {
                res.status(400);
            }
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('addToFav error is found...');
            console.error(e.message);
        }
    }


}