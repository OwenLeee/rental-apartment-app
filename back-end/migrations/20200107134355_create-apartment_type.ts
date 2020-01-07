import * as Knex from "knex";
import Table from '../table'; 

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(Table.apartmentType, table=> {
        table.increments(); 
        table.string('house_type'); 
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(Table.apartmentType);
}

