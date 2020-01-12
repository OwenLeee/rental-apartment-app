export interface IReferenceTableState {
    apartmentType: IApartmentType[];
    areaDistrict: IAreaDistrict[];
    bedrooms: IBedrooms[];
    bathrooms: IBathrooms[];
    floorLevel: IFloorLevel[];
}
export interface IApartmentType {
    id: number;
    house_type: string;
}

export interface IAreaDistrict {
    district: string;
    area: { id: number, area: string }[];
}

export interface IBedrooms {
    id: number,
    bedrooms: string;
}

export interface IBathrooms {
    id: number;
    bathrooms: string;
}
export interface IFloorLevel {
    id: number;
    level: string;
}
