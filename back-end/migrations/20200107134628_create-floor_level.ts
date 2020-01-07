import * as Knex from "knex";
import Table from '../table'; 

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(Table.floorLevel, table => {
        table.increments(); 
        table.string("level"); 
})
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(Table.floorLevel);
}

