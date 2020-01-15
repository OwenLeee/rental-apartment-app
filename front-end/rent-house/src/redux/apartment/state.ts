export interface IApartment {
    id: number, 
    // user_id?: number,
    // apartment_type_id?: number,
    // area_district_id?: number,
    // bedrooms_id?: number,
    // floor_level_id?: number,
    // bathrooms_id?: number,
    // agent_id?: number,
    apartment_title: string; 
    apartment_description: string; 
    rental_price: number;
    deposit: number;
    period_years: number; 
    address_building: string; 
    address_block: string;
    saleable_area: number; 
    gross_floor_area: number; 
    is_storeroom: boolean; 
    is_carpark: boolean;
    is_furniture: boolean;
    lat: number;
    lng: number;
    post_date: Date;
    end_date: Date;
    house_type: string;
    district: string;
    area: string;
    bedrooms: string;
    level: string;
    bathrooms: string;
}

export interface ISearchConditions{
    keywords: string;
    propertyType: string;
    bedrooms: string;
    bathrooms: string;
    minPrice: number;
    maxPrice: number;
    isStoreroom: boolean;
    isFurniture: boolean;
}

export interface IApartmentState{
    apartments: IApartment[]
    searchConditions: ISearchConditions
}