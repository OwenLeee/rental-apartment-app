import * as Knex from 'knex';
import Table from '../table';

export class SearchResultService {
    constructor(private knex: Knex) { }

    public searchingBar = async (searchKeywords: string, propertyType: string, lowestPrice: number, highestPrice: number, bedrooms: string, bathrooms: string, isFurniture: number, isStoreroom: number) => {

        const getAllHouse = this.knex(Table.rentalApartment)
            .select(`${Table.rentalApartment}.id`, "apartment_title", "apartment_description", "rental_price", "deposit", "period_years", "address_building", "address_block",
                "saleable_area", "gross_floor_area", "is_storeroom", "is_carpark", "is_furniture", "lat", "lng", "post_date", "end_date", "house_type", "district", "area", "bedrooms", "level", "bathrooms")
            .join(Table.apartmentType, { 'apartment_type_id': `${Table.apartmentType}.id` })
            .join(Table.district, { 'area_district_id': `${Table.district}.id` })
            .join(Table.bedrooms, { 'bedrooms_id': `${Table.bedrooms}.id` })
            .join(Table.floorLevel, { 'floor_level_id': `${Table.floorLevel}.id` })
            .join(Table.bathrooms, { 'bathrooms_id': `${Table.bathrooms}.id` })

        const keys = [
            "SearchKeywords",
            "PropertyType",
            "Price",
            "Bedrooms",
            "Bathrooms",
            "IsFurniture",
            "IsStoreRoom"
        ];

        let houseResult = getAllHouse;

        for (let key of keys) {
            switch (key) {

                case "SearchKeywords":
                    if (searchKeywords != "") {
                        houseResult = houseResult.where(`${Table.rentalApartment}.address_building`, 'like', `%${searchKeywords}%`)
                            .orWhere(`${Table.district}.district`, 'like', `%${searchKeywords}%`)
                            .orWhere(`${Table.district}.area`, 'like', `%${searchKeywords}%`)
                    };
                    break;
                case "PropertyType":
                    if (propertyType != "") {
                        houseResult = houseResult.where(`${Table.apartmentType}.house_type`, propertyType)
                    };
                    break;
                case "Price":
                    if (lowestPrice != 0 && highestPrice != 0) {
                        houseResult = houseResult.whereBetween(`${Table.rentalApartment}.rental_price`, [lowestPrice, highestPrice])
                    } else if (lowestPrice > 0 && highestPrice == 0) {
                        houseResult = houseResult.where(`${Table.rentalApartment}.rental_price`, `>`, lowestPrice)
                    } else if (lowestPrice == 0 && highestPrice > 0) {
                        houseResult = houseResult.whereBetween(`${Table.rentalApartment}.rental_price`, [0, highestPrice])
                    } else {
                        houseResult = houseResult
                    };
                    break;
                case "Bedrooms":
                    if (bedrooms != "") {
                        houseResult = houseResult.where(`${Table.bedrooms}.bedrooms`, bedrooms)
                    };
                    break;
                case "Bathrooms":
                    if (bathrooms != "") {
                        houseResult = houseResult.where(`${Table.bathrooms}.bathrooms`, bathrooms)
                    }
                    break;
                case "IsFurniture":
                    if (isFurniture === 1) {
                        houseResult = houseResult.where(`${Table.rentalApartment}.is_furniture`, 'true')
                    } else if (isFurniture === 2) {
                        houseResult = houseResult.where(`${Table.rentalApartment}.is_furniture`, 'false')
                    } else {  
                        houseResult = houseResult
                    };
                    break;
                case "IsStoreRoom":
                    if (isStoreroom === 1) {
                        houseResult = houseResult.where(`${Table.rentalApartment}.is_storeroom`, 'true')
                    }   else if (isStoreroom ===2) {
                        houseResult = houseResult.where(`${Table.rentalApartment}.is_storeroom`, 'false')
                    }   else {
                        houseResult = houseResult
                    }; 
                    break;
                default:
                    console.log("SearchResultService Error- For...Of...Loop", key);
            }
        }
        houseResult.orderBy("rental_price")
        return await houseResult;
    }
};

// //Testing 
// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {
//     const searchResult = new SearchResultService(knex);
//     console.log(await searchResult.searchingBar('', '', 25000, 28000, '', '', 3, 3));


// })()
// //Testing