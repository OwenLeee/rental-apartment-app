import * as Knex from "knex";
import Table from '../table'; 

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(Table.rentalApartment, table => {
        table.increments(); 
        table.integer('user_id').unsigned().notNullable(); 
        table.foreign('user_id').references(`${Table.users}.id`); 
        table.integer('apartment_type_id').unsigned().notNullable(); 
        table.foreign('apartment_type_id').references(`${Table.apartmentType}.id`); 
        table.integer('area_district_id').unsigned().notNullable(); 
        table.foreign('area_district_id').references(`${Table.district}.id`); 
        table.integer('bedrooms_id').unsigned().notNullable(); 
        table.foreign('bedrooms_id').references(`${Table.bedrooms}.id`); 
        table.integer('floor_level_id').unsigned().notNullable(); 
        table.foreign('floor_level_id').references(`${Table.floorLevel}.id`); 
        table.integer('bathrooms_id').unsigned().notNullable(); 
        table.foreign('bathrooms_id').references(`${Table.bathrooms}.id`); 
        table.integer('agent_id').unsigned().notNullable(); 
        table.foreign('agent_id').references(`${Table.agent}.id`); 
        table.text('apartment_title');
        table.text('apartment_description');
        table.integer('rental_price');
        table.integer('deposit');
        table.integer('period_years'); 
        table.string('address_building'); 
        table.string('address_block'); 
        table.integer('saleable_area'); 
        table.integer('gross_floor_area'); 
        table.boolean('is_storeroom'); 
        table.boolean('is_carpark'); 
        table.boolean('is_furniture'); 
        table.decimal('lat', 10, 6); 
        table.decimal('lng', 10, 6); 
        table.date('post_date');
        table.date('end_date');
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(Table.rentalApartment); 
}

