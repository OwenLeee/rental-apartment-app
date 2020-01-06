import * as Knex from "knex";
import Tables from "../table";
import { IUser } from "../models/user"; // Interface user

export class UserService {
  constructor(private knex: Knex) {}

  async getUserbyEmail(email: string) {
    const user: IUser = await this.knex(Tables.USERS)
      .where({ email })
      .first();
    return user;
  }
}
