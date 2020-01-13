export interface IApartmentState {
    id: number, 
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

