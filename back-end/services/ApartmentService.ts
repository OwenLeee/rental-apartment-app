import * as Knex from 'knex';
import Table from '../table';


export class ApartmentService {
    constructor(private knex: Knex) { }




    public listApartment = async (userId: number, areaDistrictId: number, levelId: number, building: string,
        block: string, bedroomsId: number, bathroomsId: number, isStoreroom: boolean, isCarpark: boolean,
        isFurniture: boolean, periodYears: number, price: number, deposit: number, title: string, description: string
    ) => {
        // insert into rental_apartment (users_id, area_district_id, floor_level_id, address_building, address_block, 
        // bedrooms_id, bathrooms_id, is_storeroom, is_carpark, is_furniture, period_years, rental_price, 
        // deposit, apartment_title, apartment_description) values (userId, areaDistrictId , levelId, building, 
        // block, bedrooms, bathrooms, isStoreroom, isCarpark, isFurniture, periodYears, price, 
        // deposit, title, description)

        await this.knex(Table.rentalApartment).insert(
            {
                users_id: userId,
                area_district_id: areaDistrictId,
                floor_level_id: levelId,
                address_building: building,
                address_block: block,
                bedrooms_id: bedroomsId,
                bathrooms_id: bathroomsId,
                is_storeroom: isStoreroom,
                is_carpark: isCarpark,
                is_furniture: isFurniture,
                period_years: periodYears,
                rental_price: price,
                deposit: deposit,
                apartment_title: title,
                apartment_description: description
            })
    };
    

    public addApartmentPhotos = async() => {
        
    }




}
