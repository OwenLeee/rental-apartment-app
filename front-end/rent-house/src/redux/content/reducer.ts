import { IContentState } from './state';
import { IContentActions } from './actions';

const initialState = {
    apartment: [],
    photos: [],
    planner: []
}

export const contentReducers = (state: IContentState = initialState, action: IContentActions) => {
    switch (action.type) {
        case "GET_APARTMENT":
            return {
                ...state,
                apartment: action.apartment
            }
        case "GET_PHOTOS":
            return {
                ...state,
                photos: action.photos
            }
        case "GET_PLANNER":
            return {
                ...state,
                planner: action.planner
            }
        default:
            return state
    }
};



