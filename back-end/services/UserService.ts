import * as Knex from "knex";
import Tables from "../table"; //Detabase- table
import { IUser } from "../models/user"; // Interface user

export class UserService {
  constructor(private knex: Knex) {}

  async getUser(email: string) {
    const user: IUser = await this.knex(Tables.users)
      .where({ email })
      .first();
    return user;
  }

  async createUser(email: string, password:string) {
    const user: IUser = await this.knex(Tables.users)
      .insert({email, password})
    return user;
  }
}
