import * as express from 'express';
import { ApartmentDetailsService } from '../services/ApartmentDetailsService';


export class ApartmentDetailsRouter {

    constructor(private apartmentDetailsService: ApartmentDetailsService) { }

    public router() {
        const router = express.Router();

        router.get('/apartment/:apartmentId', this.loadApartment)
        router.get('/apartmentPhotos/:apartmentId', this.loadApartmentPhotos)

        return router;
    };

    public loadApartment = async (req: express.Request, res: express.Response) => {
        try {
            const { apartmentId } = req.params;
            res.json(await this.apartmentDetailsService.loadApartment(parseInt(apartmentId)));
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('loadApartment error is found...');
            console.error(e.message);
        }
    };

    public loadApartmentPhotos = async (req: express.Request, res: express.Response) => {
        try {
            const { apartmentId } = req.params;
            res.json(await this.apartmentDetailsService.loadApartmentPhotos(parseInt(apartmentId)));
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('loadApartmentPhotos error is found...');
            console.error(e.message);
        }
    };
};
