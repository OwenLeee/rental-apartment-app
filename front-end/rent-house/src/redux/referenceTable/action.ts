import { IApartmentType, IAreaDistrict, IBedrooms, IBathrooms, IFloorLevel } from './state';

export function getApartmentType(apartmentType: IApartmentType[]) {
    return {
        type: "GET_APARTMENT_TYPE" as "GET_APARTMENT_TYPE",
        apartmentType
    }
};

export function getAreaDistrict(areaDistrict: IAreaDistrict[]) {
    return {
        type: "GET_AREA_DISTRICT" as "GET_AREA_DISTRICT",
        areaDistrict
    }
};

export function getBedrooms(bedrooms: IBedrooms[]) {
    return {
        type: "GET_BEDROOMS" as "GET_BEDROOMS",
        bedrooms
    }
};

export function getBathrooms(bathrooms: IBathrooms[]) {
    return {
        type: "GET_BATHROOMS" as "GET_BATHROOMS",
        bathrooms
    }
};

export function getFloorLevel(floorLevel: IFloorLevel[]) {
    return {
        type: "GET_FLOOR_LEVEL" as "GET_FLOOR_LEVEL",
        floorLevel
    }
};

type ReferenceTableActionCreators = typeof getApartmentType |
                                    typeof getAreaDistrict |
                                    typeof getBedrooms |
                                    typeof getBathrooms |
                                    typeof getFloorLevel


export type IReferenceTableActions = ReturnType<ReferenceTableActionCreators>