import * as express from 'express';
import { ListingService } from '../services/ListingService';
import { upload } from '../multer';


export class ListingRouter {

    constructor(private listingService: ListingService) { }

    public router() {
        const router = express.Router();

        router.post('/:apartmentId', this.listApartment)
        router.post('/photos:photoId', upload.single, this.addApartmentPhotos);
        router.post('/floorPlan/:apartmentId');
        router.post('/video/:apartmentId');
        router.put('/video/:apartmentId');
        router.put('/floorPlan/:apartmentId');
        router.put('/photos/:photoId');
        router.delete('/photos/:photoId');

        return router;
    }

    public listApartment = async (req: express.Request, res: express.Response) => {
        try {
            if (req.user) {
                const { areaDistrictId, levelId, building, block, bedrooms, bathrooms, isStoreroom,
                    isCarpark, isFurniture, periodYears, price, deposit, title, description } = req.body;

                await this.listingService.listApartment(
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
            await this.listingService
            res.json({ result: true });
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('addApartmentPhotos error is found...');
            console.error(e.message);
        }
    };




}

