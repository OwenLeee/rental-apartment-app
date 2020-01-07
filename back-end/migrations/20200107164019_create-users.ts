import * as Knex from "knex";
import Table from '../table'; 


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(Table.users, table => {
        table.increments(); 
        table.string('email').notNullable(); 
        table.string('password').notNullable(); 
        table.timestamps(false, true); 
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(Table.users); 
}

