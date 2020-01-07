import * as Knex from "knex";
import Table from '../table'; 


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(Table.apartmentPhotos, table => {
        table.increments(); 
        table.integer('user_id').unsigned().notNullable(); 
        table.foreign('user_id').references(`${Table.users}.id`); 
        table.string('photo_path'); 
        table.timestamps(false, true); 
    })

}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(Table.apartmentPhotos); 
}

