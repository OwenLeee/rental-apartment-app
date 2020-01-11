import * as Knex from 'knex';
import Table from '../table';

export class ProfileService {
    constructor(private knex: Knex) { }

    public favApartment = async (user_id: string, apartment_id: string) => {
        await this.knex(Table.userFavour)
            .insert([{ 'user_id': user_id, 'rental_apartment_id': apartment_id }])
    }

    public listFavApartment = async (user_id: string) => {
        let listOfFavApart = await this.knex(Table.userFavour)
            .join(Table.rentalApartment, {'rental_apartment_id': `${Table.rentalApartment}.id`})
            .join(Table.apartmentType, { 'apartment_type_id': `${Table.apartmentType}.id` })
            .join(Table.district, { 'area_district_id': `${Table.district}.id` })
            .join(Table.bedrooms, { 'bedrooms_id': `${Table.bedrooms}.id` })
            .join(Table.floorLevel, { 'floor_level_id': `${Table.floorLevel}.id` })
            .join(Table.bathrooms, { 'bathrooms_id': `${Table.bathrooms}.id` })
            .where(`${Table.userFavour}.user_id`, user_id)
            return listOfFavApart; 
    }

    public listPostApartment = async (user_id: string) => {
        let listOfPostingApart = await this.knex(Table.rentalApartment)
            .join(Table.apartmentType, { 'apartment_type_id': `${Table.apartmentType}.id` })
            .join(Table.district, { 'area_district_id': `${Table.district}.id` })
            .join(Table.bedrooms, { 'bedrooms_id': `${Table.bedrooms}.id` })
            .join(Table.floorLevel, { 'floor_level_id': `${Table.floorLevel}.id` })
            .join(Table.bathrooms, { 'bathrooms_id': `${Table.bathrooms}.id` })
            .where(`${Table.rentalApartment}.user_id`, user_id)
            return listOfPostingApart; 
    }

    public personalInfo = async (user_id: string) => {
        let personalData = await this.knex(Table.userInformation)
            .where(`${Table.userInformation}.user_id`, user_id)
            return personalData; 
    }
}


// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {
//     const profileService = new ProfileService(knex);
//     console.log(await profileService.favApartment('2', '1'));
//     console.log(await profileService.listFavApartment('3'));
//     console.log(await profileService.listPostApartment('1'));
//     console.log(await profileService.personalInfo('1'));
// })()