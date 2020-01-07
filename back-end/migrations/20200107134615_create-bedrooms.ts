import * as Knex from "knex";
import Table from '../table'; 

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(Table.bedrooms, table => {
        table.increments(); 
        table.string("bedrooms"); 
    })

}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(Table.bedrooms);
}

