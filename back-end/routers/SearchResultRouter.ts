import * as express from 'express';
import { SearchResultService } from '../services/SearchResultService';


export class SearchResultRouter {

    constructor(private searchResultService: SearchResultService) { }

    public router() {
        const router = express.Router();

        router.post('/', this.searchResult)

        return router;
    }

    public searchResult = async (req: express.Request, res: express.Response) => {
        try {
            const { keywords, propertyType, area, minPrice, maxPrice, bedrooms, bathrooms, isFurniture, isCarpark } = req.body;
            let minPriceNum = parseInt(minPrice);
                if (minPriceNum === -1){
                     minPriceNum = 0; 
                }


            let maxPriceNum = parseInt(maxPrice);
            if (maxPriceNum === -1){
                maxPriceNum = 0; 
           }

           const changeStringToEmptyString = (data : string) => {
               if (data === "All") {
                   return data = ""
               } 
               return data = data
           }

           let newPropertyType = changeStringToEmptyString (propertyType); 
           let newBedrooms = changeStringToEmptyString (bedrooms); 
           let newBathrooms = changeStringToEmptyString (bathrooms); 
           let newArea = changeStringToEmptyString(area);
            

            let resultList = await this.searchResultService.searchingBar(keywords, newPropertyType, newArea, minPriceNum, maxPriceNum, newBedrooms, newBathrooms, isFurniture, isCarpark)
            res.json({ result: true, flatList: resultList.map(apr => ({ ...apr, lat: parseFloat(apr.lat), lng: parseFloat(apr.lng) })) });
        } catch (e) {
            res.status(500).json({ result: false });
            console.error('searchResult error is found...');
            console.error(e.message);
        }
    }
}