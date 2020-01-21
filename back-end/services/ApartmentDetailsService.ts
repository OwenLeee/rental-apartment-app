import * as Knex from 'knex';
import Table from '../table';

export class ApartmentDetailsService {
    constructor(private knex: Knex) { }

    public loadApartment = async (apartmentId: number) => {
        console.log(apartmentId)
        return await this.knex(Table.rentalApartment)
            .select(`${Table.rentalApartment}.id`, "apartment_title", "apartment_description", "rental_price",
                "deposit", "period_years", "address_building", "address_block", "saleable_area", "gross_floor_area",
                "is_storeroom", "is_carpark", "is_furniture", "lat", "lng", "post_date", "end_date", "house_type",
                "district", "area", "bedrooms", "level", "bathrooms", "name", "mobile_number", "email", "video_path")

            .from(Table.rentalApartment)
            .fullOuterJoin(Table.apartmentType, 'apartment_type_id', '=', `${Table.apartmentType}.id`)
            .fullOuterJoin(Table.district, 'area_district_id', '=', `${Table.district}.id`)
            .fullOuterJoin(Table.bedrooms, 'bedrooms_id', '=', `${Table.bedrooms}.id`)
            .fullOuterJoin(Table.floorLevel, 'floor_level_id', '=', `${Table.floorLevel}.id`)
            .fullOuterJoin(Table.bathrooms, 'bathrooms_id', '=', `${Table.bathrooms}.id`)
            .fullOuterJoin(Table.apartmentVideo, `${Table.apartmentVideo}.rental_apartment_id`, '=', `${Table.rentalApartment}.id`)
            .fullOuterJoin(Table.apartmentFloorPlan, `${Table.apartmentFloorPlan}.rental_apartment_id`, '=', `${Table.rentalApartment}.id`)
            .fullOuterJoin(Table.agent, `${Table.agent}.id`, '=', `${Table.rentalApartment}.agent_id`)
            .where(`${Table.rentalApartment}.id`, apartmentId)

    }

    public loadApartmentPhotos = async (apartmentId: number) => {
        return await this.knex.select('photo_path')
            .from(Table.apartmentPhotos)
            .join(Table.rentalApartment, `${Table.apartmentPhotos}.rental_apartment_id`, '=', `${Table.rentalApartment}.id`)
            .where(`${Table.rentalApartment}.id`, apartmentId)
    }


}

////// for testing purpose ////////////

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {
//     const apartmentDetailsService = new ApartmentDetailsService(knex);

//     ////// 1 ////// OK
//     // console.log(await apartmentDetailsService.loadApartment(5));

//     ////// 2 ////// OK
//     // console.log(await apartmentDetailsService.loadApartmentPhotos(1));


// })();