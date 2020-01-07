import * as Knex from "knex";
import Table from '../table'; 

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(Table.agent, table=> {
        table.increments(); 
        table.string('name'); 
        table.string('mobile_number');
        table.string('email'); 
        table.timestamps(false,true); 
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(Table.agent);
}

