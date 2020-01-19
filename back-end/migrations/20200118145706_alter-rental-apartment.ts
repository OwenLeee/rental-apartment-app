import * as Knex from "knex";
import Table from '../table';

export async function up(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable(Table.rentalApartment);
    if (hasTable) {
        return knex.schema.alterTable(Table.rentalApartment, (table) => {
            table.integer('user_id').unsigned().nullable().alter();
            table.integer('apartment_type_id').unsigned().nullable().alter();
            table.integer('area_district_id').unsigned().nullable().alter();
            table.integer('bedrooms_id').unsigned().nullable().alter();
            table.integer('floor_level_id').unsigned().nullable().alter();
            table.integer('bathrooms_id').unsigned().nullable().alter();
            table.integer('agent_id').unsigned().nullable().alter();

        });
    } else {
        return Promise.resolve();
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable(Table.rentalApartment, (table) => {
        table.integer('user_id').unsigned().notNullable().alter();
        table.integer('apartment_type_id').unsigned().nullable().alter();
        table.integer('area_district_id').unsigned().nullable().alter();
        table.integer('bedrooms_id').unsigned().nullable().alter();
        table.integer('floor_level_id').unsigned().nullable().alter();
        table.integer('bathrooms_id').unsigned().nullable().alter();
        table.integer('agent_id').unsigned().nullable().alter();
    })
}

