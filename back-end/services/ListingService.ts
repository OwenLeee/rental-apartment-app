import * as Knex from 'knex';
import Table from '../table';
import * as moment from 'moment';


export class ListingService {
    constructor(private knex: Knex) { }


    public loadFloorPlan = async (apartmentId: number) => {
        return await this.knex.select('floor_plan_json')
            .from(Table.apartmentFloorPlan)
            .where('rental_apartment_id', apartmentId);
    }

    public listDetailsOne = async (
        userId: number, typeId: number, area: string, district: string, levelId: number, building: string,
        block: string, latitude: number, longitude: number) => {

        const areaDistrictId = ((await this.knex.
            select('id')
            .from(Table.district)
            .where({ district })
            .where({ area }).first()) as Object)['id']


        const rentalId = await this.knex(Table.rentalApartment).insert(
            {
                'user_id': userId,
                'apartment_type_id': typeId,
                'area_district_id': areaDistrictId,
                'floor_level_id': levelId,
                'address_building': building,
                'address_block': block,
                'lat': latitude,
                'lng': longitude,
            }

        )
            .returning('id')

        return rentalId[0];
    }

    public listDetailsTwo = async (
        rentalApartmentId: number, bedroomsId: number, bathroomsId: number, isStoreroom: string, isCarpark: string,
        isFurniture: string, periodYears: number) => {

        await this.knex(Table.rentalApartment).update(

            {
                'bedrooms_id': bedroomsId,
                'bathrooms_id': bathroomsId,
                'is_storeroom': isStoreroom,
                'is_carpark': isCarpark,
                'is_furniture': isFurniture,
                'period_years': periodYears,
            }
        )
            .where('id', rentalApartmentId)
    };

    public listDetailsThree = async (
        rentalApartmentId: number, saleArea: number, grossArea: number, price: number,
        deposit: number, title: string, description: string, ) => {

        await this.knex(Table.rentalApartment).update(

            {
                'saleable_area': saleArea,
                'gross_floor_area': grossArea,
                'rental_price': price,
                'deposit': deposit,
                'apartment_title': title,
                'apartment_description': description,
                'post_date': moment().format('YYYY-MM-DD'),
                'end_date': moment(moment()).add(3, 'M').format('YYYY-MM-DD'),
                'agent_id': 1,
            }
        )
            .where('id', rentalApartmentId)
    };


    public addApartmentPhotos = async (apartmentId: number, photoPaths: string[]) => {
        const apartmentPhotos = photoPaths.map((path) => ({'rental_apartment_id': apartmentId, 'photo_path': path }))
        // console.log(apartmentPhotos);
        await this.knex(Table.apartmentPhotos).insert(apartmentPhotos);
    };

    public addApartmentFloorPlan = async (apartmentId: number, floorPlanJson: string) => {
        // const newApartmentId = await this.knex(Table.rentalApartment)
        //     .insert({ 'agent_id': 1 })
        //     .returning('id')
        // console.log(newApartmentId);

        await this.knex(Table.apartmentFloorPlan)
            .insert({ 'rental_apartment_id': apartmentId, 'floor_plan_json': floorPlanJson });
    };

    public addVideo = async (apartmentId: number, videoPath: string) => {
        await this.knex(Table.apartmentVideo)
            .insert({ 'rental_apartment_id': apartmentId, 'video_path': videoPath });
    };

    public updateFloorPlan = async (apartmentId: number, floorPlanJson: string) => {
        await this.knex(Table.apartmentFloorPlan)
            .where({ 'rental_apartment_id': apartmentId })
            .update({ 'floor_plan_json': floorPlanJson });
    };

}



//////////// for testing purpose ////////////

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {
//     const listingService = new ListingService(knex);

//     ////// 1 ////// OK
//     // console.log(await listingService.loadFloorPlan(37));

//     ////// 2 ////// OK
//     // await listingService.listApartment(
//     //     1, 2, 29, 3, 'one midtown', 'A', 2, 1, true, true,
//     //     false, 300, 250, 2, 20000, 5000, 'fast', 'wonderful house', 12, 20);

//     ////// 3 ////// OK
//     // await listingService.addApartmentPhotos(1, ['house1.jpg']);

//     ////// 4 ////// OK
//     // await listingService.addApartmentFloorPlan(1, '{"New": "json"}');

//     ////// 5 ////// OK
//     // await listingService.addVideo(1, 'house1.mp4');

//     ////// 6 ////// OK
//     // await listingService.updateFloorPlan(1, '{"afterUpdate": "json"}')

// })();

