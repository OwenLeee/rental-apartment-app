import * as express from 'express';
import { ApartmentDetailsService } from '../services/ApartmentDetailsService';


export class ApartmentDetailsRouter {

    constructor(private apartmentDetailsService: ApartmentDetailsService) { }

    public router() {
        const router = express.Router();

        router.get('/apartment', this.loadApartment)
        router.get('/apartmentPhotos', this.loadApartmentPhotos)

        return router;
    };

    public loadApartment = async (req: express.Request, res: express.Response) => {
        try {
            const { apartmentId } = req.body;
            res.json(await this.apartmentDetailsService.loadApartment(apartmentId));
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('loadApartment error is found...');
            console.error(e.message);
        }
    };

    public loadApartmentPhotos = async (req: express.Request, res: express.Response) => {
        try {
            const { apartmentId } = req.body;
            res.json(await this.apartmentDetailsService.loadApartmentPhotos(apartmentId));
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('loadApartmentPhotos error is found...');
            console.error(e.message);
        }
    };
};
