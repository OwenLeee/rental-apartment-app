import * as express from 'express';
import { ReferenceService } from '../services/ReferenceService';

export class ReferenceRouter {
    constructor(private referenceService: ReferenceService) { }

    public router() {
        const router = express.Router();

        router.get('/apartmentType', this.loadApartmentType);
        router.get('/areaDistrict', this.loadAreaDistrict);
        router.get('/bedrooms', this.loadBedrooms);
        router.get('/bathrooms', this.loadBathroom);
        router.get('/floorLevel', this.loadFloorLevel);


        return router;
    }


    public loadApartmentType = async (req: express.Request, res: express.Response) => {
        try {
            res.json(await this.referenceService.loadApartmentType());
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('loadApartmentType error is found...');
            console.error(e.message);
        }
    };

    public loadAreaDistrict = async (req: express.Request, res: express.Response) => {
        try {
            res.json(await this.referenceService.loadAreaDistrict());
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('loadAreaDistrict error is found...');
            console.error(e.message);
        }
    };

    public loadBedrooms = async (req: express.Request, res: express.Response) => {
        try {
            res.json(await this.referenceService.loadBedrooms());
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('loadBedrooms error is found...');
            console.error(e.message);
        }
    };

    public loadBathroom = async (req: express.Request, res: express.Response) => {
        try {
            res.json(await this.referenceService.loadBathroom());
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('loadBathroom error is found...');
            console.error(e.message);
        }
    };

    public loadFloorLevel = async (req: express.Request, res: express.Response) => {
        try {
            res.json(await this.referenceService.loadFloorLevel());
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('loadFloorLevel error is found...');
            console.error(e.message);
        }
    };

}

