import * as express from 'express';
import { ListingService } from '../services/ListingService';
import { upload } from '../multer';


export class ListingRouter {

    constructor(private listingService: ListingService) { }

    public router() {
        const router = express.Router();

        router.get('/floorPlan', this.loadFloorPlan)
        router.post('/details/1', this.listDetailsOne);
        router.put('/details/2', this.listDetailsTwo);
        router.put('/details/3', this.listDetailsThree);
        router.post('/photos', upload.array("building"), this.addApartmentPhotos);
        router.post('/floorPlan', this.addApartmentFloorPlan);
        router.post('/video', this.addVideo);
        router.put('/floorPlan', this.updateFloorPlan);

        return router;
    }

    public loadFloorPlan = async (req: express.Request, res: express.Response) => {
        try {
            const { apartmentId } = req.body;
            res.json(await this.listingService.loadFloorPlan(apartmentId));
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('loadFloorPlan error is found...');
            console.error(e.message);
        }
    }

    public listDetailsOne = async (req: express.Request, res: express.Response) => {
        try {
            // if (req.user) {
            const { typeId, area, district, levelId,
                building, block, latitude, longitude } = req.body;

            res.json(await this.listingService.listDetailsOne(
                    /*req.user['id']*/1, typeId, area, district,
                levelId, building, block, latitude, longitude));
            // }
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('listDetailsOne error is found...');
            console.error(e.message);
        }
    }

    public listDetailsTwo = async (req: express.Request, res: express.Response) => {
        try {

            const { rentalApartmentId, bedroomsId, bathroomsId,
                isStoreroom, isCarpark, isFurniture, periodYears } = req.body;

            await this.listingService.listDetailsTwo(rentalApartmentId, bedroomsId, bathroomsId,
                isStoreroom, isCarpark, isFurniture, periodYears);
            res.json({ result: true });
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('listDetailsTwo error is found...');
            console.error(e.message);
        }
    }

    public listDetailsThree = async (req: express.Request, res: express.Response) => {
        try {

            const { rentalApartmentId, saleArea, grossArea, price,
                deposit, title, description } = req.body;

            await this.listingService.listDetailsThree(rentalApartmentId, saleArea, grossArea, price,
                deposit, title, description);
            res.json({ result: true });
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('listDetailsThree error is found...');
            console.error(e.message);
        }
    }



    public addApartmentPhotos = async (req: express.Request, res: express.Response) => {
        try {
            if (req.files != null) {
                const { apartmentId } = req.body;
                const files = req.files as Express.Multer.File[]
                const locations = files.map((file: Express.Multer.File) => file.location)

                await this.listingService.addApartmentPhotos(apartmentId, locations); // need to check
                res.json({ result: true, locations });
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

