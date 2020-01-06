import * as Knex from "knex";
import { IUser } from "../models/user"; // Interface user

export class UserService {
  constructor(private knex: Knex) {}

  async getUser(username: string) {
    const user: IUser = await this.knex(Tables.USERS)
      .where({ username })
      .first();
    return user;
  }
}
