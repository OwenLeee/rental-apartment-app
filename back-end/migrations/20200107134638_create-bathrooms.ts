import * as Knex from "knex";
import Table from '../table'; 

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(Table.bathrooms, table => {
        table.increments(); 
        table.string("bathrooms"); 
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(Table.bathrooms);
}

