import * as express from 'express';
import { ApartmentService } from '../services/ApartmentService';


export class ApartmentRouter {

    constructor(private apartmentService: ApartmentService) { }

    public router() {
        const router = express.Router();

        router.post('/listing/:apartmentId', this.listApartment)
        router.post('/listing/photos:photoId', this.addApartmentPhotos);
        router.post('/listing/floorPlan/:apartmentId');
        router.post('/listing/video/:apartmentId');
        router.put('/listing/video/:apartmentId');
        router.put('/listing/floorPlan/:apartmentId');
        router.put('/listing/photos/:photoId');
        router.delete('/listing/photos/:photoId');

        return router;
    }

    public listApartment = async (req: express.Request, res: express.Response) => {
        try {
            if (req.user) {
                const { areaDistrictId, levelId, building, block, bedrooms, bathrooms, isStoreroom,
                    isCarpark, isFurniture, periodYears, price, deposit, title, description } = req.body;

                await this.apartmentService.listApartment(
                    req.user['id'], areaDistrictId, levelId, building, block, bedrooms, bathrooms,
                    isStoreroom, isCarpark, isFurniture, periodYears, price, deposit, title, description)
            }
            res.json({ result: true });
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('listApartment error is found...');
            console.error(e.message);
        }
    };


    public addApartmentPhotos = async (req: express.Request, res: express.Response) => {
        try {
           
            res.json({ result: true });
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('addApartmentPhotos error is found...');
            console.error(e.message);
        }
    };


}

