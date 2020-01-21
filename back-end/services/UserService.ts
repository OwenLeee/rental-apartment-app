import * as Knex from "knex";
import Tables from "../table"; //Detabase- table
import { IUser, IUserInfo } from "../models/user"; // Interface user

export class UserService {
  constructor(private knex: Knex) { }

  async getUserbyEmail(email: string) {
    try {
      const user: IUser = await this.knex.table(Tables.users)
      .where({ email })
      .first(); //object
      return user;
    } catch (error) {
      console.log("UserServices.getUserbyEmail Error or forgot turn on database")
      throw error
    }
  }

  async getUserbyid(id: number) {
    try {
      const user: IUser = await this.knex.table(Tables.users)
        .where({ id })
        .first();
      return user;
    } catch (error) {
      console.log("UserServices.getUserbyid Error")
      throw error
    }
  }

  async createUser(email: string, password: string) {
    try {
      const newUser: IUser[] = await this.knex.table(Tables.users)
        .insert({ email, password })
        .returning('*')
        console.log(newUser)
      return newUser
    } catch (error) {
      console.log("UserServices.createUser Error")
      throw error
    }
  }

  async getUserInfo(id: number) {
    try {
      const userNuserInfo: IUserInfo = await this.knex.table(Tables.users)
        .select('name','icon')
        .innerJoin(Tables.userInformation, `${Tables.userInformation}.user_id`, `${Tables.users}.id`)
        .where(`${Tables.users}.id`, id)
        .first()
      return userNuserInfo;
    } catch (error) {
      console.log("UserServices.getUserInfo Error")
      throw error
    }
  }

  async createUserInfo(userID: number, name: string, icon: string) {
    try {
      const userInfo: IUserInfo[] = await this.knex.table(Tables.userInformation)
        .insert({ 'user_id': userID, name, icon })
        .returning('*')
      return userInfo
    } catch (error) {
      console.log("UserServices.createUserInfo Error")
      throw error
    }
  }
}
