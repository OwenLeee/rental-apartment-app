import * as Knex from 'knex';
import Table from '../table';

export class SearchResultService {
constructor(private knex: Knex) {}

public searchingBar = async (searchKeywords: string, propertyType: string, lowestPrice: number, highestPrice: number, isFurniture: boolean, bedrooms: string, bathrooms: string, isParking: boolean) => {

let houseResult = await this.knex(Table.rentalApartment)
.join(Table.apartmentType, {'apartment_type_id' : `${Table.apartmentType}.id`})
.join(Table.district, {'area_district_id' : `${Table.district}.id`})
.join(Table.bedrooms, {'bedrooms_id' : `${Table.bedrooms}.id`})
.join(Table.floorLevel, {'floor_level_id' : `${Table.floorLevel}.id`})
.join(Table.bathrooms, {'bathrooms_id' : `${Table.bathrooms}.id`})
.where(`${Table.apartmentType}.house_type`, propertyType)
.whereBetween(`${Table.rentalApartment}.rental_price`, [lowestPrice, highestPrice])
.where(`${Table.rentalApartment}.is_furniture`, isFurniture)
.where(`${Table.bedrooms}.bedrooms`, bedrooms)
.where(`${Table.bathrooms}.bathrooms`, bathrooms)
.where(`${Table.rentalApartment}.is_carpark`, isParking)
.where(`${Table.rentalApartment}.address_building`, 'like', `%${searchKeywords}%`)
.orWhere(`${Table.district}.district`, 'like', `%${searchKeywords}%`) 
.orWhere(`${Table.district}.area`, 'like', `%${searchKeywords}%`)

return houseResult; 
}

}; 




// //Testing 
// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {
//     const searchResult = new SearchResultService(knex);
//     console.log(await searchResult.searchingBar('Sheung', 'Partitioned Flat', 10000, 30000, true, '2', '1', false));
// })()
// //Testing