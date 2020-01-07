import * as Knex from "knex";
import Table from '../table'; 

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(Table.district, table=> {
        table.increments(); 
        table.string('district'); 
        table.string('area');
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(Table.district);
}

