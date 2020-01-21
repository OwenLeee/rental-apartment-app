export interface IUser {
  id: number;
  email: string;
  password: string ;

}

export interface IUserInfo {
  id:number,
  userID:number,
  name:string,
  gender:string,
  icon:string,
}

export interface IUserProfile{
  icon:string,
  name:string,
  email:string,
  listOfApartment:ApartmentList[]
}

export interface ApartmentList{
  id:number,
  title:string,
  price:number,
  address:string,
  houseType:string,
  district:string,
  area:string,
  bedrooms:string,
  bathrooms:string,
  isCarpark:boolean,
  isFurniture:boolean,
  listofPhoto:PhotoList[]
}

export interface PhotoList{
  photoUrl:string
}