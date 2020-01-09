import * as express from 'express';
import { ListingService } from '../services/ListingService';
import { upload } from '../multer';


export class ListingRouter {

    constructor(private listingService: ListingService) { }

    public router() {
        const router = express.Router();

        router.get('/floorPlan', this.loadFloorPlan)
        router.post('/apartment', this.listApartment)
        router.post('/photos', upload.single, this.addApartmentPhotos);
        router.post('/floorPlan', this.addApartmentFloorPlan);
        router.post('/video', this.addVideo);
        router.put('/floorPlan', this.updateFloorPlan);

        return router;
    }

    public loadFloorPlan = async (req: express.Request, res: express.Response) => {
        try {
            const { apartmentId } = req.body;
            res.json({ result: true, floorPlan: await this.listingService.loadFloorPlan(apartmentId) });
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('loadFloorPlan error is found...');
            console.error(e.message);
        }
    }

    public listApartment = async (req: express.Request, res: express.Response) => {
        try {
            if (req.user) {
                const { areaDistrictId, levelId, building, block, bedrooms, bathrooms, isStoreroom,
                    isCarpark, isFurniture, periodYears, price, deposit, title, description } = req.body;

                await this.listingService.listApartment(
                    req.user['id'], areaDistrictId, levelId, building, block, bedrooms, bathrooms,
                    isStoreroom, isCarpark, isFurniture, periodYears, price, deposit, title, description);
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
            if (req.files != null) {
                const { apartmentId } = req.body;
                await this.listingService.addApartmentPhotos(apartmentId, req.files[0].filename); // need to check
                res.json({ result: true });
            }
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('addApartmentPhotos error is found...');
            console.error(e.message);
        }
    };


    public addApartmentFloorPlan = async (req: express.Request, res: express.Response) => {
        try {
            const { apartmentId, floorPlanJson } = req.body;
            await this.listingService.addApartmentFloorPlan(apartmentId, floorPlanJson);
            res.json({ result: true });
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('addApartmentFloorPlan error is found...');
            console.error(e.message);
        }
    };


    public addVideo = async (req: express.Request, res: express.Response) => {
        try {
            if (req.files != null) {
                const { apartmentId } = req.body;
                await this.listingService.addVideo(apartmentId, req.files[0].filename); // need to check
                res.json({ result: true });
            }
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('addVideo error is found...');
            console.error(e.message);
        }
    };


    public updateFloorPlan = async (req: express.Request, res: express.Response) => {
        try {
            const { apartmentId, floorPlanJson } = req.body;
            await this.listingService.updateFloorPlan(apartmentId, floorPlanJson);
            res.json({ result: true });
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('updateFloorPlan error is found...');
            console.error(e.message);
        }
    };


}

