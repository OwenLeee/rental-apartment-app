import * as Knex from 'knex';
import Table from '../table';

// interface AreaDistrict {
//     district: string;
//     area: string[];
// }

export class ReferenceService {
    constructor(private knex: Knex) { }


    public loadApartmentType = async () => {
        return await this.knex(Table.apartmentType)
    };

    public loadAreaDistrict = async () => {
        const areaDistrict =
            await this.knex(Table.district)
                .distinct("district");
        for (const district of areaDistrict) {
            district.area = (
                await this.knex.select('id', "area")
                    .from(Table.district)
                    .where("district", district.district)
            )
        }
        return areaDistrict;
    };

    public loadBedrooms = async () => {
        return await this.knex(Table.bedrooms)
    };

    public loadBathroom = async () => {
        return await this.knex(Table.bathrooms)
    };

    public loadFloorLevel = async () => {
        return await this.knex(Table.floorLevel)
    };
}


//////////// for testing purpose ////////////

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {
//     const referenceService = new ReferenceService(knex);

//     // console.log(1, await referenceService.loadApartmentType()) // ok
//     // console.log(2, await referenceService.loadAreaDistrict()) // ok
//     // console.log(3, await referenceService.loadBedrooms()) // ok
//     // console.log(4, await referenceService.loadBathroom()) // ok
//     // console.log(5, await referenceService.loadFloorLevel()) //ok

// })();