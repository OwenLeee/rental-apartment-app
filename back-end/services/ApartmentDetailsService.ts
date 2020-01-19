import * as Knex from 'knex';
import Table from '../table';

export class ApartmentDetailsService {
    constructor(private knex: Knex) { }

    public loadApartment = async (apartmentId: number) => {
        return await this.knex.select('*')
            .from(Table.rentalApartment)
            .join(Table.apartmentType, 'apartment_type_id', '=', `${Table.apartmentType}.id`)
            .join(Table.district, 'area_district_id', '=', `${Table.district}.id`)
            .join(Table.bedrooms, 'bedrooms_id', '=', `${Table.bedrooms}.id`)
            .join(Table.floorLevel, 'floor_level_id', '=', `${Table.floorLevel}.id`)
            .join(Table.bathrooms, 'bathrooms_id', '=', `${Table.bathrooms}.id`)
            .join(Table.apartmentVideo, `${Table.apartmentVideo}.rental_apartment_id`, '=', `${Table.rentalApartment}.id`)
            .join(Table.apartmentFloorPlan, `${Table.apartmentFloorPlan}.rental_apartment_id`, '=', `${Table.rentalApartment}.id`)
            .where(`${Table.rentalApartment}.id`, apartmentId)

    }

    public loadApartmentPhotos = async (apartmentId: number) => {
        return await this.knex.select('photo_path')
            .from(Table.apartmentPhotos)
            .join(Table.rentalApartment, `${Table.apartmentPhotos}.rental_apartment_id`, '=', `${Table.rentalApartment}.id`)
            .where(`${Table.rentalApartment}.id`, apartmentId)
    }


}

////////// for testing purpose ////////////

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {
//     const apartmentDetailsService = new ApartmentDetailsService(knex);

//     ////// 1 ////// OK
//     // console.log(await apartmentDetailsService.loadApartment(1));

//     ////// 2 ////// OK
//     // console.log(await apartmentDetailsService.loadApartmentPhotos(1));


// })();