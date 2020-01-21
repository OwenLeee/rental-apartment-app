import * as Knex from "knex";
import Tables from "../table"; //Detabase- table
import { IUser, IUserInfo, ApartmentList, PhotoList } from "../models/user"; // Interface user

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
        .select('name', 'icon')
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

  async getUserRentalInfo(id: number) {
    try {
      const userAllInfo: ApartmentList[] = await this.knex.table(Tables.users)
        .select(`${Tables.rentalApartment}.id`, 'apartment_title', 'rental_price', 'address_building', 'house_type', 'district', 'area', 'bedrooms', 'bathrooms', 'is_carpark', 'is_furniture')
        .innerJoin(Tables.userInformation, `${Tables.userInformation}.user_id`, `${Tables.users}.id`) //email, icon, name
        .innerJoin(Tables.rentalApartment, `${Tables.rentalApartment}.user_id`, `${Tables.users}.id`) //apartment_title, rental_price, address_building, is_carpark, is_furniture
        .join(Tables.apartmentType, { 'apartment_type_id': `${Tables.apartmentType}.id` })//house_type
        .join(Tables.district, { 'area_district_id': `${Tables.district}.id` })//district, area
        .join(Tables.bedrooms, { 'bedrooms_id': `${Tables.bedrooms}.id` }) //bedrooms
        .join(Tables.bathrooms, { 'bathrooms_id': `${Tables.bathrooms}.id` })//bathrooms
        .where(`${Tables.users}.id`, id)
      return userAllInfo;
    } catch (error) {
      console.log("UserServices.getUserRentalInfo Error")
      throw error
    }
  }

  async getApartmentPhotos(apartmentID: number) {
    try {
      const getPhotos: PhotoList[] = await this.knex.table(Tables.rentalApartment)
        .select(`${Tables.rentalApartment}.id`, 'photo_path')
        .innerJoin(Tables.apartmentPhotos, `${Tables.apartmentPhotos}.rental_apartment_id`, `${Tables.rentalApartment}.id`) //photo_paths
        .where(`${Tables.rentalApartment}.id`, apartmentID)
      return getPhotos;
    } catch (error) {
      console.log("UserServices.getApartmentPhoto Error")
      throw error
    }
  }
}
