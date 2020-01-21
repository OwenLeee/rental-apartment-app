import * as Knex from "knex";
import Tables from "../table"; //Detabase- table
import { IUser, IUserInfo } from "../models/user"; // Interface user

export class UserService {
  constructor(private knex: Knex) { }

  async getUserbyEmail(email: string) {
    try {
      const user: IUser = await this.knex(Tables.users)
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
      const user: IUser = await this.knex(Tables.users)
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
      const newUser: IUser[] = await this.knex(Tables.users)
        .insert({ email, password })
        .returning('*')
        console.log(newUser)
      return newUser
    } catch (error) {
      console.log("UserServices.createUser Error")
      throw error
    }
  }

  async getUserInfo(id: string) {
    try {
      const userNuserInfo: IUserInfo = await this.knex.table(Tables.userInformation)
        .innerJoin(Tables.users, `${Tables.userInformation}.users_id`, `${Tables.users}.id`)
        .where({ id })
        .first();
      return userNuserInfo;
    } catch (error) {
      console.log("UserServices.getUserInfo Error")
      throw error
    }
  }

  async createUserInfo(userID: number, name: string, gender: string, mobile: number, icon: string) {
    try {
      let verifyEmail = false;
      let verifyMobile = false;
      const userInfo: IUserInfo[] = await this.knex(Tables.userInformation)
        .insert({ 'user_id': userID, name, gender, mobile, icon, 'verified_email': verifyEmail, 'verified_mobile': verifyMobile })
        .returning('*')
      return userInfo
    } catch (error) {
      console.log("UserServices.createUserInfo Error")
      throw error
    }
  }
}
