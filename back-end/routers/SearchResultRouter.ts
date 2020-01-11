import * as express from 'express';
import { SearchResultService } from '../services/SearchResultService';


export class SearchResultRouter {

    constructor(private searchResultService: SearchResultService) { }

    public router() {
        const router = express.Router();

        router.get('/', this.searchResult)

        return router;
    }

    public searchResult = async (req: express.Request, res: express.Response) => {
        try {
            const { keywords, propertyType, minPrice, maxPrice, bedrooms, bathrooms, isFurniture, isCarpark } = req.body;
            let minPriceNum = parseInt(minPrice);
            let maxPriceNum = parseInt(maxPrice);

            let resultList = await this.searchResultService.searchingBar(keywords, propertyType, minPriceNum, maxPriceNum, bedrooms, bathrooms, isFurniture, isCarpark)
            res.json({ result: true, flatList: resultList });
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('searchResult error is found...');
            console.error(e.message);
        }
    }
}