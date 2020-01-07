import * as Knex from "knex";
import Table from '../table'; 

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(Table.apartmentFloorPlan, table => {
        table.increments(); 
        table.integer('rental_apartment_id').unsigned().notNullable(); 
        table.foreign('rental_apartment_id').references(`${Table.rentalApartment}.id`); 
        table.json('floor_plan_json'); 
        table.timestamps(false, true); 
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(Table.apartmentFloorPlan); 
}

